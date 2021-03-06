/**
 * Create users table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('auth_business_units', table => {
    table.uuid('id').primary();
    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull();
    table.string('business_unit_name').notNull();
    table.string('business_unit_url');
    table.enu('status', ['ACTIVE', 'INACTIVE']).defaultTo('INACTIVE');
    table.uuid('parent_bu_id');
    table
      .foreign('parent_bu_id')
      .references('id')
      .on('auth_business_units');
  });
}

/**
 * Drop users table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('auth_business_units');
}
