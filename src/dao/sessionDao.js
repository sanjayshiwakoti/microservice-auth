import Session from '../models/Session';

export function saveSession(session) {
  return new Session({
    id: session.id,
    refreshToken: session.refreshToken,
    expireTime: session.expireTime,
    status: session.status,
    userId: session.userId
  })
    .save(null, { method: 'insert' })
    .then(data => data.refresh());
}

export function getSession(userId, refreshToken) {
  return new Session({ userId, refreshToken }).fetch().then(data => data.refresh());
}

export function updateSession(userId, responsePayload, oldRefreshToken) {
  return new Session()
    .where({
      user_id: userId,
      refresh_token: responsePayload.refreshToken
    })
    .save(
      {
        refreshToken: oldRefreshToken
      },
      { patch: true, require: false }
    )
    .then(data => data.refresh());
}
