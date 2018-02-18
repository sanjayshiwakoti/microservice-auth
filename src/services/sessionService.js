import uuid from 'uuid/v4';
import * as sessionDao from '../dao/sessionDao';

export function createSession(rawSessionData, user) {
  let session = {
    id: uuid(),
    refreshToken: rawSessionData.refreshToken,
    expireTime: 123,
    status: true,
    createdBy: user.get('id')
  };
  console.log('session: ', session);
  sessionDao.saveSession(session);
}
