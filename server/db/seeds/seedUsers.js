
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('users').insert({
          github_login: 'cwkosman',
          github_avatar: 'https://avatars0.githubusercontent.com/u/23545041?v=3&s=400',
          github_name: 'Chuck Kosman'
        }),
        knex('users').insert({
          github_login: 'tkg214',
          github_avatar: 'https://avatars1.githubusercontent.com/u/24704531?v=3&s=400',
          github_name: 'Ken Takagi'
        }),
        knex('users').insert({
          github_login: 'sharonsw',
          github_avatar: 'https://avatars1.githubusercontent.com/u/18632451?v=3&s=400',
          github_name: 'Sharon Li'
        }),
        knex('users').insert({
          github_login: 'nuwen',
          github_avatar: 'https://avatars0.githubusercontent.com/u/17226019?v=3&s=400',
          github_name: 'Danton Nguyen'
        }),
        knex('users').insert({
          github_login: 'tester523',
          github_avatar: 'https://s-media-cache-ak0.pinimg.com/564x/a5/0e/0e/a50e0ec8f06c96a0e914464712dcfafb.jpg',
          github_name: 'Don Burks'
        }),
      ]);
    });
};
