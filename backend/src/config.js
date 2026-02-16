import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const config = {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    client: {
        prod: process.env.CLIENT_URL,
        dev: process.env.CLIENT_URL_DEV
    },
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
    sessionTimeoutMs: Number(process.env.SESSION_TIMEOUT_MS),
    demo: process.env.DEMO
};

export default config;