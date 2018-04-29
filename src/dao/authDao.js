import User from '../models/user';

export function getByUsername(username) {
  return new User({ username }).fetch({withRelated: ['business_unit_id']}).then(user => user.refresh());
}

export function getByUsernameAndBU(username, slug) {
  return new User({ username, slug }).fetch({withRelated: ['business_unit_id']}).then(user => user.refresh());
}

export function getByColumnName(columnName, value) {
  return new User({ [columnName]: value }).fetch({withRelated: ['business_unit_id']}).then(user => user.refresh());
}
