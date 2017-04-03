const moment = require('moment');

module.exports = function makeDataHelpers(knex) {

  // TODO use left outer join for messages query on setRoomData

  function convertMs(ms) {
    const m = Math.floor(ms / 60000);
    const s = ((ms % 60000) / 1000).toFixed(0);
    return m + ":" + (s < 10 ? '0' : '') + s;
  }

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
        knex('classrooms')
        .leftOuterJoin('recording_info', 'classrooms.id', 'recording_info.classroom_id')
        .select('recording_info.created_at as timestamp', 'recording_info.id', 'recording_info.time')
        .where('classroom_id', roomData.roomID)
        .orderBy('recording_info.created_at', 'desc')
        .then((data) => {
          roomData.recordings = data;
          roomData.recordings.forEach((recording) => {
            recording.id = 'R_' + recording.id;
            recording.time = convertMs(recording.time);
            recording.timestamp = moment(recording.timestamp).format('dddd, MMMM Do YYYY, h:mm:ss a');
          });
          knex.raw('select m.created_at as timestamp, m.user_id as messageuserid, m.id, m.content as content, u.github_login as name, u.github_avatar as avatarurl from classrooms c join messages m on c.id=m.classroom_id join users u on m.user_id=u.id where c.room_key = ?', room)
          .then((data) => {
            roomData.messages = data.rows;
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
                message.timestamp = moment(message.timestamp).format('dddd, MMMM Do YYYY, h:mm:ss a');
              })
              roomData.roomOwnerID === data.rows[0].id ? roomData.isAuthorized = true : roomData.isAuthorized = false;
              cb(roomData);
            });
          });
        });
      });
    },

    updateEditorValues: function(roomID, editorValue) {
      knex('edits')
      .insert({
        classroom_id: roomID,
        content: editorValue
      })
      .then(() => {
        return;
      });
    },

    toggleEditorLock: function(roomID, isEditorLocked) {
      knex('classrooms')
      .where({id: roomID})
      .update({editorLocked: isEditorLocked})
      .then(() => {
        return;
      });
    },

    toggleChatLock: function(roomID, isChatLocked) {
      knex('classrooms')
      .where({id: roomID})
      .update({chatLocked: isChatLocked})
      .then(() => {
        return;
      });
    },

    storeMessage: function(roomID, userID, content) {
      knex('messages')
      .insert({
        classroom_id: roomID,
        user_id: userID,
        content: content
      })
      .then(() => {
        return;
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
    },

    storeRecordingInfo: function(recordingInfo) {
      knex('recording_info')
      .insert(recordingInfo)
      .then(() => {
        return;
      });
    },

    getRecordingInfoForStream: function(recordingID, cb) {
      knex('recording_info')
      .select('recording_info.*')
      .where({id: recordingID})
      .then((data) => {
        fileInfo = {
          fileName: data[0].file_name,
          filePath: data[0].file_path,
          sampleRate: data[0].sample_rate
        }
        cb(fileInfo)
      });
    },

    //TODO refactor below tsrange
    getEditorValuesForStream: function(recordingID, cb) {
      knex('recording_info')
      .select('recording_info.*')
      .where({id: recordingID})
      .then((data) => {
        let audioLength = data[0].time;
        let start = moment(moment(data[0].created_at).diff(data[0].time, 'milliseconds')).format();
        let end = moment(data[0].created_at).format();
        let roomID = data[0].classroom_id;
        knex('edits')
        .select('content', 'created_at')
        .whereRaw('classroom_id = ? and created_at between ?::timestamp and ?::timestamp', [roomID, start, end])
        .orderBy('created_at', 'asc')
        .then((data) => {
          let audioStart = moment(start).unix() * 1000;
          data.forEach((row) => {
            row.time = moment(row.created_at).unix() * 1000;
            delete row.created_at;
          })
          const RATE_MS = 100;
          let n = audioLength / RATE_MS;
          let intervalArray = new Array();
          for (let i = 0; i < n; i++) {
            intervalArray.push(new Object());
          }
          let ri = 0;
          let t = 0
          intervalArray.forEach((interval) => {
            if (ri === data.length) {
              interval.time = t;
              interval.content = data[ri - 1].content;
            } else if (audioStart < data[ri].time) {
              interval.time = t;
              interval.content = data[ri].content;
            } else {
              interval.time = t;
              interval.content = data[ri].content;
              ri++;
            }
            audioStart += RATE_MS;
            t += RATE_MS;
          })
          cb(intervalArray);
        })
      })
    }
  }
}
