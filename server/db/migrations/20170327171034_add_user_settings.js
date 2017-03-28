
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', t => {
      t.string('editor_theme').defaultTo('monokai');
      t.integer('font_size').defaultTo(12);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', t => {
      t.dropColumn('editor_theme');
      t.dropColumn('font_size');
    })
  ]);
};
