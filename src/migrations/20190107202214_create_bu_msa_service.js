/**
 * Create auth_bu_msa_service table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('auth_bu_msa_service', table => {
    table.uuid('id').primary();
    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull();
    table.uuid('business_unit_id').notNull();
    table.uuid('msa_service_id').notNull();
    table.string('image_name').notNull();
    table.uuid('created_by').notNull();
    table.enu('status', ['ACTIVE', 'INACTIVE']).defaultTo('INACTIVE');
    table
      .foreign('business_unit_id')
      .references('id')
      .on('auth_business_units');
    table
      .foreign('msa_service_id')
      .references('id')
      .on('auth_msa_service');
    table
      .foreign('created_by')
      .references('id')
      .on('auth_users');
  });
}

/**
 * Drop auth_bu_msa_service table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('auth_bu_msa_service');
}
