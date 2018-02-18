import Session from '../models/Session';

export function saveSession(session) {
  return new Session({
    id: session.id,
    refreshToken: session.refreshToken,
    expireTime: session.expireTime,
    status: session.status,
    createdBy: session.createdBy
  })
    .save()
    .then(data => data);
}
