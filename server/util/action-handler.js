const moment = require('moment');

module.exports = function makeActionHandlers(roomOwnerID, dbHelpers, sk, rm) {
  const clientData = sk.token();
  const room = sk.room();

  return {
    UPDATE_EDITOR_VALUES : (action) => {
      if (roomOwnerID === clientData.id) {
        dbHelpers.updateEditorValues(action.payload.roomID, action.payload.editorValue);
        sk.broadcastToRoom(room, action);  //is callback above necessary??
      }
    },
    TOGGLE_EDITOR_LOCK : (action) => {
      if (roomOwnerID === clientData.id) {
        dbHelpers.toggleEditorLock(action.payload.roomID, action.payload.isEditorLocked);
        sk.broadcastToRoom(room, action);
      }
    },
    TOGGLE_CHAT_LOCK : (action) => {
      if (roomOwnerID === clientData.id) {
        dbHelpers.toggleChatLock(action.payload.roomID, action.payload.isChatLocked);
        sk.broadcastToRoom(room, action);
      }
    },
    EXECUTE_CODE : (action) => {
      if (roomOwnerID === clientData.id) {
        sk.broadcastToRoom(room, action);
      }
    },
    SEND_OUTGOING_MESSAGE : (action) => {
      const newAction = {
        type: 'RECEIVE_NEW_MESSAGE',
        payload: {
          id: 'M_' + Date.now(),
          name: clientData.github_login,
          content: action.payload.content,
          avatarurl: clientData.github_avatar,
          isOwnMessage: false,
          timestamp: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
        }
      }
      dbHelpers.storeMessage(action.payload.roomID, clientData.id, action.payload.content);
      sk.broadcastToRoom(room, newAction);
      const newActionToSelf = Object.assign({}, newAction);
      newActionToSelf.payload.isOwnMessage = true;
      // TODO assign isn't working properly--newAction.isOwnMessage is true MUST CHANGE
      sk.emitToUser(newActionToSelf);
    },
    CHANGE_EDITOR_THEME : (action) => {
      dbHelpers.changeEditorTheme(clientData.id, action.payload.userSettings.theme);
    },
    CHANGE_FONT_SIZE : (action) => {
      dbHelpers.changeFontSize(clientData.id, action.payload.userSettings.fontSize);
    }
  }
}
