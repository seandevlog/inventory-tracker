async function getCloudSignature() {
    const res = await fetch('/api/cloudinary/upload-signature');
    if (!res.ok) throw new Error('Failed to get cloud signature');
    return res.json();
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
    const cloudinaryRes = await fetch(url, {
        method: 'POST',
        body: formData   
    })

    const data = await cloudinaryRes.json();
    if (!cloudinaryRes.ok) throw new Error('Cloudinary error:' + data.error?.message || 'Unknown');

    return data;
}

async function getReplaceSignature(publicId) {
    console.log(publicId, encodeURIComponent(publicId))
    const res = await fetch(`/api/cloudinary/upload-signature/replace?publicId=${encodeURIComponent(publicId)}`);  
    if (!res.ok) throw new Error('Failed to get replace signature');
    return res.json();
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
    const cloudinaryRes = await fetch(url, {
        method: 'POST',
        body: formData
    })

    const data = await cloudinaryRes.json();

    if (!cloudinaryRes.ok) throw new Error(data.error?.message || 'Replace failed');

    return data;
}