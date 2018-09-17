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
  return knex('auth_msa_service').then(() => {
    return Promise.all([
      // Inserts seed entries
      knex('auth_msa_service').insert([
        {
          id: uuid(),
          service_name: 'msa-common-gateway',
          git_url: 'for automation',
          tag_name: '1.0',
          is_service_mandatory: 1,
          status: 'ACTIVE',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuid(),
          service_name: 'msa-auth',
          git_url: 'for automation',
          tag_name: '1.0',
          is_service_mandatory: 1,
          status: 'ACTIVE',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuid(),
          service_name: 'msa-gateway',
          git_url: 'for automation',
          tag_name: '1.0',
          is_service_mandatory: 0,
          status: 'ACTIVE',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: uuid(),
          service_name: 'msa-transaction',
          git_url: 'for automation',
          tag_name: '1.0',
          is_service_mandatory: 0,
          status: 'ACTIVE',
          created_at: new Date(),
          updated_at: new Date()
        }
      ])
    ]);
  });
}
