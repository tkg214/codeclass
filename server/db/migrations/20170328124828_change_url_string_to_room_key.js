
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('classrooms', t => {
      t.renameColumn('url_string', 'room_key');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('classrooms', t => {
      t.renameColumn('room_key', 'url_string');
    })
  ]);
};
