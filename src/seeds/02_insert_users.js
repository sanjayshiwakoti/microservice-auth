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
          id: '1f2ed857-3bfa-4105-9832-c54a5b1e5884',
          username: 'msa',
          password: '$2a$10$tPwy8qRJyGUS31PKdN8PReY.QqZryjD8rlychGPeIXm8XMbOYlaDe', // msa
          slug: 'msa',
          created_at: new Date(),
          updated_at: new Date()
        }
      ])
    ]);
  });
}
