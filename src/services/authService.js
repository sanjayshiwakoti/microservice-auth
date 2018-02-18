import Boom from 'boom';
import * as authDao from '../dao/authDao';
import * as jwtUtils from '../utils/jwtUtils';
import * as hashUtils from '../utils/hashUtils';
import * as sessionService from './sessionService';
import * as jwtConfigs from '../configs/jwtConfig';

/**
 * Validate login.
 * @param {string} username
 * @param {string} password
 */
export async function validateLogin(username, password) {
  let user = await authDao.getByUsername(username);

  if (!user) {
    throw new Boom.unauthorized('Invalid Credentials');
  }

  if (hashUtils.compare(password, user.get('password'))) {
    let responsePayload = getAccessAndRefreshTokens(user);
    sessionService.createSession(responsePayload, user);

    return responsePayload;
  } else {
    throw new Boom.unauthorized('Invalid Credentials');
  }
}

/**
 * Validate access token.
 * @param {string} accessToken
 */
export function verifyAccessToken(accessToken) {
  return verifyToken(accessToken, jwtConfigs.SECRET_ACCESS_KEY);
}

/**
 * Validate refresh token.
 * @param {string} refreshToken
 */
export function verifyRefreshToken(refreshToken) {
  return verifyToken(refreshToken, jwtConfigs.SECRET_REFRESH_KEY);
}

/**
 * Generate new pair of access and refresh token.
 * @param {string} refreshToken
 */
export function getNewAccessAndRefreshToken(refreshToken) {
  let userId = verifyRefreshToken(refreshToken);
  let user = authDao.getByColumnName('id', userId);

  if (!user) {
    throw new Boom.unauthorized('User not found');
  }

  return getAccessAndRefreshTokens(user);
}

/**
 * Validate JWT token.
 * @param {string} token
 */
function verifyToken(tokenWithPrefix, secretKey) {
  try {
    let token = tokenWithPrefix.split(' ')[1];

    return jwtUtils.verifyToken(token, secretKey);
  } catch (error) {
    throw new Boom.unauthorized('Unauthorized Access');
  }
}

/**
 * Construct object with access token, refresh token and userId.
 * @param {User} user
 */
function getAccessAndRefreshTokens(user) {
  let accessToken = jwtUtils.createToken(
    { userId: user.get('id') },
    jwtConfigs.SECRET_ACCESS_KEY,
    jwtConfigs.ACCESS_TOKEN_CONFIG
  );
  let refreshToken = jwtUtils.createToken(
    { userId: user.get('id') },
    jwtConfigs.SECRET_REFRESH_KEY,
    jwtConfigs.REFRESH_TOKEN_CONFIG
  );

  return {
    accessToken,
    refreshToken,
    userId: user.get('id')
  };
}
