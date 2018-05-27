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
          service_name: 'msa-common-gateway',
          is_service_mandatory: 1,
          status: 'ACTIVE',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuid(),
          service_name: 'msa-auth',
          is_service_mandatory: 1,
          status: 'ACTIVE',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuid(),
          service_name: 'msa-gateway',
          is_service_mandatory: 0,
          status: 'ACTIVE',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuid(),
          service_name: 'msa-transaction',
          is_service_mandatory: 0,
          status: 'ACTIVE',
          created_at: new Date(),
          updated_at: new Date()
        }
      ])
    ]);
  });
}
