import User from './user';
import bookshelf from '../db';

const TABLE_NAME = 'auth_sessions';

/**
 * Session model.
 */

let Session = bookshelf.Model.extend({
  tableName: TABLE_NAME,

  hasTimestamps: true,

  createdBy: function() {
    return this.belongsTo(User, 'created_by');
  }
});

export default Session;
