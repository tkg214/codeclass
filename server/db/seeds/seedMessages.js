
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('messages').insert({
          content: "We all wanna die, we're meeseeks! Awww, it's you guys! Well, she's my daughter, Summer. I outrank you. Or, family means nothing, in which case, don't play that card. I'm Mr. Crowbar, and here is my friend, who is also a crowbar!",
          user_id: 1,
          classroom_id:1
        }),

        knex('messages').insert({
          content: "Don't be a baby! You avoid getting shot in real life all the time, Morty! Just do the same thing here and we'll be fine! You're our boy dawg, don't even trip. Sometimes science is a lot more art, than science. A lot of people don't get that. Well he roped me into this!",
          user_id: 2,
          classroom_id:1
        }),

        knex('messages').insert({
          content: "We all wanna die, we're meeseeks! Awww, it's you guys! Well, she's my daughter, Summer. I outrank you. Or, family means nothing, in which case, don't play that card. I'm Mr. Crowbar, and here is my friend, who is also a crowbar!",
          user_id: 3,
          classroom_id:2
        }),

        knex('messages').insert({
          content: "5 more minute of this and I'm going to get mad! Dont mind those stare goblins. You're young, you have your whole life ahead of you, and your anal cavity is still taut yet malleable. If I've learned one thing, it's that before you get anywhere in life, you gotta stop listening to yourself.",
          user_id: 4,
          classroom_id:2
        }),

        knex('messages').insert({
          content: "Those guys are inside you building a piece of shit Ethan! They're inside you building a monument to compromise! Fuck them, fuck those people, fuck this whole thing Ethan. Yea. If you spend all day shuffling words around you can make anything sound bad, Morty. The trick to cereal is keeping 70% of it above the milk. I'd like to order one large person with extra people please. white people, no no no black people... and hispanic on half.",
          user_id: 5,
          classroom_id:2
        }),

        knex('messages').insert({
          content: "Snuffles want to be understood. Snuffles need to be understood. Don't be trippin dog we got you. This aftershave made women want me, but it also made me impotent! Your failures are your own, old man! I say, follow throooough!",
          user_id: 1,
          classroom_id:3
        }),

        knex('messages').insert({
          content: "We all wanna die, we're meeseeks! Awww, it's you guys! Well, she's my daughter, Summer. I outrank you. Or, family means nothing, in which case, don't play that card. I'm Mr. Crowbar, and here is my friend, who is also a crowbar!",
          user_id: 3,
          classroom_id:3
        }),

        knex('messages').insert({
          content: "Don't be a baby! You avoid getting shot in real life all the time, Morty! Just do the same thing here and we'll be fine! You're our boy dawg, don't even trip. Sometimes science is a lot more art, than science. A lot of people don't get that. Well he roped me into this!",
          user_id: 2,
          classroom_id:4
        }),

        knex('messages').insert({
          content: "We all wanna die, we're meeseeks! Awww, it's you guys! Well, she's my daughter, Summer. I outrank you. Or, family means nothing, in which case, don't play that card. I'm Mr. Crowbar, and here is my friend, who is also a crowbar!",
          user_id: 4,
          classroom_id:4
        }),

        knex('messages').insert({
          content: "5 more minute of this and I'm going to get mad! Dont mind those stare goblins. You're young, you have your whole life ahead of you, and your anal cavity is still taut yet malleable. If I've learned one thing, it's that before you get anywhere in life, you gotta stop listening to yourself.",
          user_id: 5,
          classroom_id:5
        }),

        knex('messages').insert({
          content: "Those guys are inside you building a piece of shit Ethan! They're inside you building a monument to compromise! Fuck them, fuck those people, fuck this whole thing Ethan. Yea. If you spend all day shuffling words around you can make anything sound bad, Morty. The trick to cereal is keeping 70% of it above the milk. I'd like to order one large person with extra people please. white people, no no no black people... and hispanic on half.",
          user_id: 1,
          classroom_id:5
        }),
      ]);
    });
};
