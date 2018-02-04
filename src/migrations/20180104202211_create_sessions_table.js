/**
 * Create users table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('auth_sessions', sessionTable => {
    sessionTable.uuid('id').primary();

    sessionTable.string('refreshToken', 255).notNullable();

    sessionTable.integer('expireTime', 15).notNullable();

    sessionTable
      .boolean('status')
      .notNullable()
      .defaultTo(true);

    sessionTable
      .dateTime('createdDate')
      .notNullable()
      .default(knex.fn.now());

    sessionTable
      .uuid('createdBy')
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
