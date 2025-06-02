import dotenv from 'dotenv';

export const SECRET_KEY = process.env.SECRET_AUTH_KEY; // Use environment variables in production
export const JWT_EXPIRES_IN = '1h';