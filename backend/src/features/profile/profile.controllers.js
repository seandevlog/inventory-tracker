import service from './profile.services.js';

const get = async (req, res) => {
  const { profile } = await service.get({ refreshToken: req.cookies?.refreshToken ?? '' })

  return res.status(200).json({ success: true, profile })
}

export default {
  get
}