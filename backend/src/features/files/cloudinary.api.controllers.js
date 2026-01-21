import services from "./cloudinary.api.services.js";

const uploadSignature = (req, res) => { 
  const {
    timestamp,
    signature
  } = services.uploadSignature({ path: req.body.path });

  res.status(200).json({
    timestamp,
    signature,
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    uploadPreset: process.env.UPLOAD_PRESET,
    folder
  }); 
}

const replaceUploadSignature = (req, res) => {
  const {
    timestamp,
    signature
  } = services.replaceUploadSignature({ publicId: req.query.publicId });

  res.status(200).json({
    timestamp,
    signature,
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    uploadPreset: process.env.UPLOAD_PRESET,
    publicId,
    overwrite: true,
    invalidate: true
  });
}

export default {
  uploadSignature,
  replaceUploadSignature
}