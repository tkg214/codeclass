
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('classrooms').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('classrooms').insert({
          topic: 'Javascript 101',
          language_id: 'javascript',
          editorLocked: false,
          chatLocked: false,
          user_id: 5
        }),
        knex('classrooms').insert({
          topic: 'Magic for Beginners: Ruby',
          language_id: 'ruby',
          editorLocked: false,
          chatLocked: false,
          user_id: 5
        }),
        knex('classrooms').insert({
          topic: 'Python',
          language_id: 'python',
          editorLocked: false,
          chatLocked: false,
          user_id: 5
        }),
        knex('classrooms').insert({
          topic: 'Editor Locked:JS',
          language_id: 'javascript',
          editorLocked: true,
          chatLocked: false,
          user_id: 2
        }),
        knex('classrooms').insert({
          topic: 'Chat Locked: Ruby',
          language_id: 'ruby',
          editorLocked: false,
          chatLocked: true,
          user_id: 3
        }),
        knex('classrooms').insert({
          topic: 'Both Locked: Python',
          language_id: 'python',
          editorLocked: true,
          chatLocked: true,
          user_id: 4
        })
      ]);
    });
};
