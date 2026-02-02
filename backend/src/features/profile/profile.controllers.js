const get = async (req, res) => {
  const profile = req.payload;
  return res.status(200).json({ success: true, profile })
}

export default {
  get
}