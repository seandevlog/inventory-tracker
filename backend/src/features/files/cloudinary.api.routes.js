import express from 'express';
import controller from './cloudinary.api.controllers.js';
const router = express.Router();

router.get('/upload-signature', controller.uploadSignature);

router.get('/upload-signature/replace', controller.replaceUploadSignature)

export default router;