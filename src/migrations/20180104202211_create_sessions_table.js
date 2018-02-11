/**
 * Create users table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('auth_sessions', sessionTable => {
    sessionTable.uuid('id').primary();

    sessionTable.string('refresh_token', 255).notNullable();

    sessionTable.integer('expire_time', 15).notNullable();

    sessionTable
      .boolean('status')
      .notNullable()
      .defaultTo(true);

    sessionTable
      .dateTime('created_at')
      .notNullable()
      .default(knex.fn.now());

    sessionTable.timestamp('updated_at');

    sessionTable
      .uuid('created_by')
      .notNullable()
      .references('auth_users.id');
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
