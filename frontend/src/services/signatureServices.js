import axios from 'axios';
import config from '../config';

const server = `${config.server}`;

async function getCloudSignature() {
    try {
        const { data } = await axios.get(`${server}/api/cloudinary/upload-signature`);
        return data;
    } catch (err) {
        if (!axios.isAxiosError(err)) {
            throw new Error(`Cloudinary error: ${err}`);
        }
        throw new Error(`Axios error: ${err}`);
    }
}

export async function uploadImageSigned(file) {
    const {
        timestamp,
        signature,
        cloudName,
        uploadPreset,
        apiKey,
        folder
    } = await getCloudSignature();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', folder);

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    try {
        const { data } = await axios.post(url, formData);

        return data;
    } catch (err) {
        if (!axios.isAxiosError(err)) {
            throw new Error(`Cloudinary error: + ${err}`);
        }
        throw new Error(`Axios error: ${err}`);
    }
}

async function getReplaceSignature(publicId) {
    const url = `${server}/api/cloudinary/upload-signature/replace?publicId=${encodeURIComponent(publicId)}`
    try {
        const { data } = await axios.get(url);

        return data; 
    } catch (err) {
        if (!axios.isAxiosError(err)) {
            throw new Error(`Cloudinary error: + ${err}`);
        }
        throw new Error(`Axios error: ${err}`);
    }
} 

export async function replaceImageSigned(file, publicId) {
    const {
        timestamp,
        signature,
        cloudName,
        apiKey,
        uploadPreset,
        publicId: signedPublicId,
        overwrite,
        invalidate
    } = await getReplaceSignature(publicId);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('upload_preset', uploadPreset);
    formData.append('public_id', signedPublicId);
    formData.append('overwrite', overwrite);
    formData.append('invalidate', invalidate);

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    try {
        const { data } = await axios.post(url, formData);

        return data;
    } catch (err) {
        if (!axios.isAxiosError(err)) {
            throw new Error(`Cloudinary error: + ${err}`);
        }
        throw new Error(`Axios error: ${err}`);
    }
}

export default {
    uploadImageSigned,
    replaceImageSigned
}