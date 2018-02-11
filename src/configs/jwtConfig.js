export const ACCESS_TOKEN_CONFIG = {
  expiresIn: '365d',
  issuer: 'ISO'
};

export const REFRESH_TOKEN_CONFIG = {
  expiresIn: '1d',
  issuer: 'ISO'
};

export const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
export const SECRET_REFRESH_KEY = process.env.SECRET_REFRESH_KEY;
