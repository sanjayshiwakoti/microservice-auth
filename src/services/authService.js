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
export async function validateLogin(username, password, slug) {
  let user = await authDao.getByUsernameAndBU(username, slug);

  if (!user) {
    throw new Boom.unauthorized('Invalid Credentials');
  }

  if (hashUtils.compare(password, user.get('password'))) {
    let responsePayload = getAccessAndRefreshTokens(user.get('id'));
    sessionService.saveSession(responsePayload, user.get('id'));
    responsePayload['user'] = user;

    return responsePayload;
  } else {
    throw new Boom.unauthorized('Invalid Credentials');
  }
}

/**
 * Validate login.
 * @param {string} username
 * @param {string} password
 */
export async function getUsersBusinessUnits(userId) {
  let usersBusinessUnits = await authDao.getUsersBusinessUnits(userId);

  if (!usersBusinessUnits) {
    throw new Boom.notFound('Invalid UserID');
  }

  return usersBusinessUnits;
}

/**
 * Validate access token.
 * @param {string} accessToken
 */
export async function verifyAccessToken(tokenWithPrefix) {
  let [bearer, accessToken] = tokenWithPrefix.split(' ');

  if (accessToken == undefined) {
    throw new Boom.unauthorized('Unauthorized');
  }

  let userPayload = verifyToken(accessToken, jwtConfigs.SECRET_ACCESS_KEY);

  return await authDao.getByColumnName('id', userPayload.userId);
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
export function getNewAccessAndRefreshToken(oldRefreshToken) {
  let user = verifyRefreshToken(oldRefreshToken);

  return sessionService
    .getSession(user.userId, oldRefreshToken)
    .then(session => {
      if (!session) {
        throw new Boom.unauthorized('Unauthorized');
      }

      let responsePayload = getAccessAndRefreshTokens(user.userId);
      sessionService.updateSession(user.userId, responsePayload, oldRefreshToken);

      return responsePayload;
    })
    .catch(() => {
      throw new Boom.unauthorized('Unauthorized');
    });
}

/**
 * Validate JWT token.
 * @param {string} token
 */
function verifyToken(token, secretKey) {
  try {
    return jwtUtils.verifyToken(token, secretKey);
  } catch (error) {
    throw new Boom.unauthorized('Unauthorized Access');
  }
}

/**
 * Construct object with access token, refresh token and userId.
 * @param {User} user
 */
function getAccessAndRefreshTokens(userId) {
  let accessToken = jwtUtils.createToken({ userId }, jwtConfigs.SECRET_ACCESS_KEY, jwtConfigs.ACCESS_TOKEN_CONFIG);
  let refreshToken = jwtUtils.createToken({ userId }, jwtConfigs.SECRET_REFRESH_KEY, jwtConfigs.REFRESH_TOKEN_CONFIG);

  return {
    accessToken,
    refreshToken,
    userId
  };
}
