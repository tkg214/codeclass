
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', t => {
      t.string('github_id').notNullable;
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', t => {
      t.dropColumn('github_id');
    })
  ]);
};
