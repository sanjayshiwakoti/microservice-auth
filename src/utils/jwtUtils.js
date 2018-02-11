import jwt from 'jsonwebtoken';

/**
 * Use to create jwt tokens.
 * @param {object} payload
 * @param {string} secretKey
 * @param {object} options
 */
export const createToken = (payload, secretKey, options) => {
  return jwt.sign(payload, secretKey, options);
};

export const verifyToken = (token, secretKey, options) => {
  return jwt.verify(token, secretKey, options);
};
