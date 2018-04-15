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
  return knex('auth_users').then(() => {
    return Promise.all([
      // Inserts seed entries
      knex('auth_users').insert([
        {
          id: uuid(),
          username: 'rosia',
          password: '$2a$10$.wM5qSPpvqSE7uMnO7YFVuZxrPu/6W9X2X4tCEXF1hhypE0vp2fam', // rosia
          business_unit_id: 'c80185b3-058c-4360-85b1-bff2da8ea571',
          created_at: new Date(),
          updated_at: new Date()
        }
      ])
    ]);
  });
}
