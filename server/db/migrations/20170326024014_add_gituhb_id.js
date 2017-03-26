
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', t => {
      t.string('github_id').notNullable;
      t.string('github_access_token').notNullable;
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', t => {
      t.dropColumn('github_id');
      t.dropColumn('github_access_token');
    })
  ]);
};
