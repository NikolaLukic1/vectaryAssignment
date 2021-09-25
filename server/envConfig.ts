import dotenv from 'dotenv';

dotenv.config();

export default {
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    TYPEORM_HOST: process.env.HOST,
    TYPEORM_USERNAME: process.env.DBUSERNAME,
    TYPEORM_PASSWORD: process.env.PASSWORD,
    TYPEORM_DATABASE: process.env.DATABASE,
    TYPEORM_PORT: process.env.DBPORT
}