import User from '../models/user';

export function getByUsername(username) {
  return new User({ username }).fetch().then(user => user.refresh());
}

export function getByColumnName(columnName, value) {
  return new User({ [columnName]: value }).fetch().then(user => user.refresh());
}
