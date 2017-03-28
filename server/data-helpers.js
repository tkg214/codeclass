module.exports = function makeDataHelpers(knex) {

  return {
    setRoomData: function(room, clientData, cb) {
      knex.raw('select c.*, e.content from classrooms c join edits e on c.id=e.classroom_id where c.url_string = ? order by e.created_at desc limit 1', room)
        .then((data) => {
          let roomData = {
            roomOwnerID: data.rows[0].user_id,
            isEditorLocked: data.rows[0].editorLocked,
            isChatLocked: data.rows[0].chatLocked,
            editorValue: data.rows[0].content,
            language: data.rows[0].language_id,
            roomID: data.rows[0].id
          }
          knex.raw('select m.created_at as timestamp, m.content as content, u.github_name as name, u.github_avatar as avatarURL from classrooms c join messages m on c.id=m.classroom_id join users u on m.user_id=u.id where c.url_string = ?', room)
          .then((data) => {
            roomData.messages = data.rows
            knex.raw('select * from users where github_login= ?', clientData.github_login)
            .then((data) => {
              roomData.userSettings = {
                theme: data.rows[0].editor_theme,
                fontSize: data.rows[0].font_size
              }
              roomData.roomOwnerID === data.rows[0].id ? roomData.isAuthorized = true : roomData.isAuthorized = false;
              delete roomData.roomOwnerID

              cb(roomData);

            })
          })
        })
      }
  }
}
