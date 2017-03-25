
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("users"), (table) => {
      table.increments();
      table.string('github_login').notNullable;
      table.string('github_avatar').notNullable;
      table.string('github_name').notNullable;
    }

    knex.schema.createTable("classrooms", (table) => {
      table.increments();
      table.string('topic').notNullable();
      table.string('language_id').notNullable();
      table.boolean('editorLocked').notNullable();
      table.boolean('chatLocked').notNullable();
      table.foreign('user_id').references('users.id')
    }),


  ])

};

exports.down = function(knex, Promise) {

};
