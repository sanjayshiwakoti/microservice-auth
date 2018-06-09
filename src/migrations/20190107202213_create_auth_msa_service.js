/**
 * Create auth_msa_service table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('auth_msa_service', table => {
    table.uuid('id').primary();
    table.string('service_name').notNull();
    table
      .boolean('is_service_mandatory')
      .defaultTo(1)
      .notNull();
    table.enu('status', ['ACTIVE', 'INACTIVE']).defaultTo('ACTIVE');
    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull();
  });
}

/**
 * Drop auth_msa_service table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('auth_msa_service');
}
