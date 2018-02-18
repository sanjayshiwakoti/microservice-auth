/**
 * Create users table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('auth_sessions', sessionTable => {
    sessionTable.uuid('id').primary();

    sessionTable.uuid('user_id').notNullable();

    sessionTable.string('refresh_token', 255).notNullable();

    sessionTable.integer('expire_time', 15).notNullable();

    sessionTable
      .boolean('status')
      .notNullable()
      .defaultTo(true);

    sessionTable.timestamp('created_at').notNullable();

    sessionTable.timestamp('updated_at');

    sessionTable
      .foreign('user_id')
      .references('id')
      .on('auth_users');
  });
}

/**
 * Drop users table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('auth_sessions');
}
