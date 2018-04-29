import bookshelf from '../db';
import Session from './Session';
import BusinessUnits from './BusinessUnits';

const TABLE_NAME = 'auth_users';

/**
 * User model.
 */

let User = bookshelf.Model.extend({
  tableName: TABLE_NAME,

  hasTimestamps: true,

  sessions: function() {
    return this.hasMany(Session);
  },
  business_unit_id: function() {
    return this.belongsToMany(BusinessUnits, 'auth_users_business_units', 'user_id', 'business_unit_id');
  }
});

export default User;
