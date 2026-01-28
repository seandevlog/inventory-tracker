import service from './profile.services.js';

const get = async (req, res) => {
  if (!req.user) {
    const { profile } = await service.get({ refreshToken: req.cookies?.refreshToken ?? '' })

    return res.status(200).json({ success: true, profile })
  }
  return res.status(200).json({ success: true, profile: req.user })
}

export default {
  get
}