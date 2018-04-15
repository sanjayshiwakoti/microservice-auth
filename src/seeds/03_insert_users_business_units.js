import uuid from 'uuid/v4';
/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('auth_users_business_units').then(() => {
    return Promise.all([
      // Inserts seed entries
      knex('auth_users_business_units').insert([
        {
          id: uuid(),
          user_id: '1f2ed857-3bfa-4105-9832-c54a5b1e5884',
          business_unit_id: 'c80185b3-058c-4360-85b1-bff2da8ea571',
          status: 'ACTIVE',
          created_at: new Date(),
          updated_at: new Date()
        }
      ])
    ]);
  });
}
