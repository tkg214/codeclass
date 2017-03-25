
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("users", (table) => {
      table.increments();
      table.string('github_login').notNullable;
      table.string('github_avatar').notNullable;
      table.string('github_name').notNullable;
    }),

    knex.schema.createTable("classrooms", (table) => {
      table.increments();
      table.string('topic').notNullable();
      table.string('language_id').notNullable();
      table.boolean('editorLocked').notNullable();
      table.boolean('chatLocked').notNullable();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
    }),

    knex.schema.createTable("edits", (table) => {
      table.increments();
      table.text('content').notNullable();
      table.integer('classroom_id').unsigned();
      table.foreign('classroom_id').references('classrooms.id');
    }),

    knex.schema.createTable("messages", (table) => {
      table.increments();
      table.text('content').notNullable();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.integer('classroom_id').unsigned();
      table.foreign('classroom_id').references('classrooms.id');
    })


  ]);

};

exports.down = function(knex, Promise) {

  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('classrooms'),
    knex.schema.dropTable('edits'),
    knex.schema.dropTable('messages'),
  ])

};
