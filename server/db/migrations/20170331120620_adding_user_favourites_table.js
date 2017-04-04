
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("favorites", (table) => {
      table.increments();
      table.integer('classroom_id').unsigned().notNullable();
      table.integer('user_id').unsigned().notNullable();
    }),
  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("favorites")
  ])

};
