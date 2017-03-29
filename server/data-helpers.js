module.exports = function makeDataHelpers(knex) {
  return {
    setRoomData: function(room, clientData, cb) {
      knex('classrooms')
      .leftOuterJoin('edits', 'classrooms.id', 'edits.classroom_id')
      .select('classrooms.*', 'edits.content')
      .where('room_key', room)
      .orderBy('edits.created_at', 'desc')
      .limit(1)
      .then(data => {
        let roomData = {
          roomOwnerID: data[0].user_id,
          isEditorLocked: data[0].editorLocked,
          isChatLocked: data[0].chatLocked,
          editorValue: data[0].content,
          language: data[0].language_id,
          roomID: data[0].id
        };
        console.log(roomData);
        knex.raw('select m.created_at as timestamp, m.content as content, u.github_name as name, u.github_avatar as avatarURL from classrooms c join messages m on c.id=m.classroom_id join users u on m.user_id=u.id where c.room_key = ?', room)
        .then((data) => {
          roomData.messages = data.rows
          knex.raw('select * from users where id= ?', clientData.id)
          .then((data) => {
            roomData.userSettings = {
              theme: data.rows[0].editor_theme,
              fontSize: data.rows[0].font_size
            };
            roomData.roomOwnerID === data.rows[0].id ? roomData.isAuthorized = true : roomData.isAuthorized = false;
            delete roomData.roomOwnerID;
            cb(roomData);
            });
          });
        });
      }
  }
}
