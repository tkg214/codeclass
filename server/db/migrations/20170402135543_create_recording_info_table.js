
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('recording_info', (t) => {
      t.increments();
      t.integer('classroom_id').references('id').inTable('classrooms').notNullable();
      t.varchar('file_path', 20).notNullable();
      t.varchar('file_name', 200).notNullable();
      t.integer('time').notNullable();
      t.integer('sample_rate').notNullable();
      t.timestamps(true, true);
    });
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('recording_info'),
  ]);
};
