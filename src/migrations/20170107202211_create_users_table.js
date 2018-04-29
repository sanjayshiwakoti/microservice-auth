/**
 * Create users table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('auth_users', table => {
    table.uuid('id').primary();
    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull();
    table.string('slug').notNull();
    table.string('username').notNull();
    table.string('password').notNull();
    table.enu('status', ['ACTIVE', 'INACTIVE']).defaultTo('INACTIVE');
    table.unique(['slug', 'username'])
  });
}

/**
 * Drop users table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('auth_users');
}
