import uuid from 'uuid/v4';
import * as sessionDao from '../dao/sessionDao';

export function saveSession(rawSessionData, userId) {
  let session = {
    id: uuid(),
    refreshToken: rawSessionData.refreshToken,
    expireTime: 123,
    status: true,
    userId
  };

  return sessionDao.saveSession(session).then(data => data);
}

export function getSession(userId, refreshToken) {
  return sessionDao.getSession(userId, refreshToken).then(data => data);
}

export function updateSession(userId, responsePayload, oldRefreshToken) {
  return sessionDao.updateSession(userId, responsePayload, oldRefreshToken).then(data => data);
}
