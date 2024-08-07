import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export default registerAs('config', () => {
  return {
    database: {
      port: process.env.DATABASE_PORT,
    },
    postgres: {
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      name: process.env.POSTGRES_NAME,
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
    },
    jwt: {
      jwtSecret: process.env.JWT_SECRET,
      jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
      refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
      accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
    },
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      apiUrl: process.env.OPENAI_URL,
    },
    mail: {
      key: process.env.GOOGLE_API,
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
      agent: process.env.EMAIL_AGENT,
      port: process.env.EMAIL_PORT,
    },
  };
});
