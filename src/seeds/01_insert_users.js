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
  return knex('auth_users')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('auth_users').insert([
          {
            id: uuid(),
            username: 'rosia',
            password: 'rosia',
            created_at: new Date(),
            updated_at: new Date()
          }
        ])
      ]);
    });
}
