import * as dotenv from "dotenv";
dotenv.config();
//server config
export const PORT = 8000;
export const NODE_ENV = process.env.NODE_ENV;

export const OTP_EXPIRY = process.env.OTP_EXPIRY;
export const JWT_KEY = process.env.JWT_KEY;

export const EMAIL = process.env.EMAIL;
export const SMTP_AUTH_PASS = process.env.SMTP_AUTH_PASS;

//DB configuration
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const KAFKA_URL = process.env.KAFKA_URL;
export const MONGO_URL = process.env.MONGO_URL;
