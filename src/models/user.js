import bookshelf from '../db';
import Session from './Session';

const TABLE_NAME = 'auth_users';

/**
 * User model.
 */

let User = bookshelf.Model.extend({
  tableName: TABLE_NAME,

  hasTimestamps: true,

  sessions: function() {
    return this.hasMany(Session);
  }
});

export default User;
