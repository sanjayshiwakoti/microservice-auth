/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('auth_business_units').then(() => {
    return Promise.all([
      // Inserts seed entries
      knex('auth_business_units').insert([
        {
          id: 'c80185b3-058c-4360-85b1-bff2da8ea571',
          business_unit_name: 'MSA',
          business_unit_url: 'http://localhost:9001',
          status: 'ACTIVE',
          parent_bu_id: null,
          created_at: new Date(),
          updated_at: new Date()
        }
      ])
    ]);
  });
}
