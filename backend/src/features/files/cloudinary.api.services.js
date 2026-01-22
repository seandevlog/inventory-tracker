import { v2 as cloudinary } from 'cloudinary';
import { BadGatewayError } from '#errors/index.js';

const uploadSignature = ({ path }) => {
  if (!path) throw new BadRequestError('Folder path is required');

  const timestamp = Math.round(Date.now() / 1000);
  const folder = path;

  const paramsToSign = {
    timestamp,
    upload_preset: process.env.UPLOAD_PRESET,
    folder
  }

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET
  );

  if (!signature) throw new BadGatewayError('Signature Request Failed');
  
  return { timestamp, signature, folder };
}

const replaceUploadSignature = ({ publicId }) => {
  if (!publicId) throw new BadRequestError('publicId is required');

  const timestamp = Math.round(Date.now() /1000);

  const paramsToSign = {
    timestamp,
    upload_preset: process.env.UPLOAD_PRESET,
    public_id: publicId,
    overwrite: true,
    invalidate: true
  }

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET
  )

  if (!signature) throw new BadGatewayError('Signature Request Failed');

  return { timestamp, signature };
}

export default {
  uploadSignature,
  replaceUploadSignature
}