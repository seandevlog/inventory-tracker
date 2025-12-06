import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

const config = {
    port: process.env.PORT,
    database: process.env.MONGO_URI,
    cloud: {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
};

export default config;