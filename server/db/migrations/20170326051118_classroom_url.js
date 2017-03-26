
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('classrooms', t => {
      t.string('url_string').notNullable;
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('classrooms', t => {
      t.dropColumn('url_string');
    })
  ]);
};
