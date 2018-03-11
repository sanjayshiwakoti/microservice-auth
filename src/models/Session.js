import User from './user';
import bookshelf from '../db';

const TABLE_NAME = 'auth_sessions';

/**
 * Session model.
 */

let Session = bookshelf.Model.extend({
  tableName: TABLE_NAME,

  hasTimestamps: true,

  user: function() {
    return this.belongsTo(User, 'user_id');
  }
});

export default Session;
