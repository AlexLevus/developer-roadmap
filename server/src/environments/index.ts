// author
const AUTHOR: string = process.env.AUTHOR || 'Sysimate';

// environment
const NODE_ENV: string = process.env.NODE_ENV || 'development';

// application
const END_POINT: string = process.env.END_POINT || 'graphql';
const APP_URL: string = process.env.APP_URL || 'https://common-morning-production.up.railway.app';
const GRAPHQL_DEPTH_LIMIT: number = +process.env.GRAPHQL_DEPTH_LIMIT || 3;
const PRIMARY_COLOR: string = process.env.PRIMARY_COLOR || '#87e8de';

// jsonwebtoken
const ISSUER: string = process.env.ISSUER || 'Aleksandr Levus';
const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN || 'access-token';
const ACCESS_TOKEN_SECRET: string =
  process.env.ACCESS_TOKEN_SECRET || 'access-token-key';
const REFRESH_TOKEN: string = process.env.REFRESH_TOKEN || 'refresh-token';
const REFRESH_TOKEN_SECRET: string =
  process.env.REFRESH_TOKEN_SECRET || 'refresh-token-key';
const EMAIL_TOKEN: string = process.env.EMAIL_TOKEN || 'email-token';
const EMAIL_TOKEN_SECRET: string =
  process.env.EMAIL_TOKEN_SECRET || 'email-token-key';
const RESETPASS_TOKEN: string =
  process.env.RESETPASS_TOKEN || 'resetpass-token';
const RESETPASS_TOKEN_SECRET: string =
  process.env.RESETPASS_TOKEN_SECRET || 'resetpass-token-key';

// bcrypt
const BCRYPT_SALT: number = +process.env.BCRYPT_SALT || 10;

// nodemailer
const NODEMAILER_USER: string = process.env.NODEMAILER_USER || 'alexislevus';
const NODEMAILER_PASS: string = process.env.NODEMAILER_PASS || 'nluxppyyhleyycja';

export {
  APP_URL,
  AUTHOR,
  END_POINT,
  ISSUER,
  ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SECRET,
  RESETPASS_TOKEN,
  RESETPASS_TOKEN_SECRET,
  EMAIL_TOKEN,
  EMAIL_TOKEN_SECRET,
  BCRYPT_SALT,
  NODEMAILER_USER,
  NODEMAILER_PASS,
  GRAPHQL_DEPTH_LIMIT,
  PRIMARY_COLOR,
  NODE_ENV
};
