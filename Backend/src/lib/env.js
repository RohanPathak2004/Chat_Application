import 'dotenv/config.js';

export const ENV = {
    PORT: process.env.PORT,

    MONGO_URL: process.env.MONGO_URL,

    NODE_ENV: process.env.NODE_ENV,

    JWT_SECRET: process.env.JWT_SECRET,

    RESEND_API_KEY:process.env.RESEND_API_KEY ,
    RESEND_EMAIL :process.env.RESEND_EMAIL,
    RESEND_NAME :process.env.RESEND_NAME,

    CLIENT_URL:process.env.CLIENT_URL,
}