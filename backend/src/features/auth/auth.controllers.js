import service from './auth.services.js';
import Config from '#config';

export const loginSubmit = async (req, res) => {
  const { accessToken, refreshToken, session } = await service.login({ data: req.body });

  res.cookie('refreshToken', refreshToken, {
    expires: session.expiresIn,
    httpOnly: true,
    secure: Config.nodeEnv === 'production',
    sameSite: Config.nodeEnv === 'production' ? 'none': 'lax'
  })
  res.status(200).json({ 
    success: true,
    accessToken
  })
}

export const registerSubmit = async (req, res) => {
  await service.register({ data: req.body });
  res.status(200).json({ success: true });
}

export const refresh = async (req, res) => {
  const { 
    accessToken, 
    newRefreshToken, 
    newSession
  } = await service.refresh({ refreshToken: req.cookies?.refreshToken ?? '' })

  if (newRefreshToken && newSession) { 
    res.cookie('refreshToken', newRefreshToken, {
      expires: newSession.expiresIn,
      httpOnly: true,
      secure: Config.nodeEnv === 'production',
      sameSite: Config.nodeEnv === 'production' ? 'none': 'lax'
    })
  }

  res.status(200).json({ 
    success: true,    
    accessToken
  });
}

export const logout = async (req, res) => {
  await service.logout({ refreshToken: req.cookies?.refreshToken ?? '' })

  res.cookie('refreshToken', '', {
    maxAge: 0,
    httpOnly: true,
    secure: Config.nodeEnv === 'production',
    sameSite: Config.nodeEnv === 'production' ? 'none': 'lax'
  })

  res.status(200).json({ success: true });
}

export default {
  loginSubmit,
  registerSubmit,
  refresh,
  logout
}