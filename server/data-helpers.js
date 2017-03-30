const moment = require('moment');

module.exports = function makeDataHelpers(knex) {
  return {
    setRoomData: function(room, userID, cb) {
      knex('classrooms')
      .leftOuterJoin('edits', 'classrooms.id', 'edits.classroom_id')
      .select('classrooms.*', 'edits.content')
      .where('room_key', room)
      .orderBy('edits.created_at', 'desc')
      .limit(1)
      .then(data => {
        let roomData = {
          roomOwnerID: data[0].user_id,
          roomTitle: data[0].topic,
          isEditorLocked: data[0].editorLocked,
          isChatLocked: data[0].chatLocked,
          editorValue: data[0].content || '',
          language: data[0].language_id,
          roomID: data[0].id
        };
        knex.raw('select m.created_at as timestamp, m.user_id as messageuserid, m.id, m.content as content, u.github_login as name, u.github_avatar as avatarurl from classrooms c join messages m on c.id=m.classroom_id join users u on m.user_id=u.id where c.room_key = ?', room)
        .then((data) => {
          roomData.messages = data.rows
          knex.raw('select * from users where id= ?', userID)
          .then((data) => {
            roomData.userSettings = {
              theme: data.rows[0].editor_theme,
              fontSize: data.rows[0].font_size
            };
            roomData.messages.forEach((message) => {
              if (message.messageuserid === userID) {
                message.isOwnMessage = true;
              } else {
                message.isOwnMessage = false;
              }
              delete message.messageuserid;
              message.id = 'M_' + message.id
              message.timestamp = moment(message.timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a");
            })
            roomData.roomOwnerID === data.rows[0].id ? roomData.isAuthorized = true : roomData.isAuthorized = false;
            cb(roomData);
          });
        });
      });
    },

    updateEditorValues: function(roomID, editorValue, cb) {
      knex('edits')
      .insert({
        classroom_id: roomID,
        content: editorValue
      })
      .then(() => {
        cb();
      });
    },

    toggleEditorLock: function(roomID, isEditorLocked, cb) {
      knex('classrooms')
      .where({id: roomID})
      .update({editorLocked: isEditorLocked})
      .then(() => {
        cb();
      });
    },

    toggleChatLock: function(roomID, isChatLocked, cb) {
      knex('classrooms')
      .where({id: roomID})
      .update({chatLocked: isChatLocked})
      .then(() => {
        cb();
      });
    },

    storeMessage: function(roomID, userID, content, cb) {
      knex('messages')
      .insert({
        classroom_id: roomID,
        user_id: userID,
        content: content
      })
      .then(() => {
        cb();
      });
    },

    changeEditorTheme: function(userID, theme) {
      knex('users')
      .where({id: userID})
      .update({editor_theme: theme})
      .then(() => {
        return;
      });
    },

    changeFontSize: function(userID, fontSize) {
      knex('users')
      .where({id: userID})
      .update({font_size: fontSize})
      .then(() => {
        return;
      });
    }
  }
}
