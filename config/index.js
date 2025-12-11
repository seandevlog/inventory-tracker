import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

const config = {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    database: process.env.MONGO_URI,
    cloud: {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    },
    access: {
        key: process.env.ACCESS_SECURE_KEY,
        expiresIn: process.env.ACCESS_EXPIRES_IN
    },
    sessionTimeoutMs: Number(process.env.SESSION_TIMEOUT_MS)
};

export default config;