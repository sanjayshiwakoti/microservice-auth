import bookshelf from '../db';

const TABLE_NAME = 'auth_business_units';

/**
 * Business Unit model.
 */

let BusinessUnit = bookshelf.Model.extend({
  tableName: TABLE_NAME,

  hasTimestamps: true
});

export default BusinessUnit;
