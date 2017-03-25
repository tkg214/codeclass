
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (t) => {
      t.timestamps(true, true);
    }),

    knex.schema.table('classrooms', (t) => {
      t.timestamps(true, true);
    }),

    knex.schema.table('edits', (t) => {
      t.timestamps(true, true);
    }),

    knex.schema.table('messages', (t) => {
      t.timestamps(true, true);
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (t) => {
      table.dropTimestamps();
    }),

    knex.schema.table('classrooms', (t) => {
      table.dropTimestamps();
    }),

    knex.schema.table('edits', (t) => {
      table.dropTimestamps();
    }),

    knex.schema.table('messages', (t) => {
      table.dropTimestamps();
    }),
  ])

};
