module.exports = function makeActionHandlers(roomOwnerID, dbHelpers, sk, rm) {
  const clientData = sk.token();
  const room = sk.room();
  
  return {
    UPDATE_EDITOR_VALUES : (action) => {
      if (roomOwnerID === clientData.id) {
        dbHelpers.updateEditorValues(action.payload.roomID, action.payload.editorValue, sk.broadcastToRoom);
        sk.broadcastToRoom(room, action);  //is callback above necessary?? 
      }
    },
    TOGGLE_EDITOR_LOCK : (action) => {
      console.log("toggle editor lock: ", action);
      if (roomOwnerID === clientData.id) {
        dbHelpers.toggleEditorLock(action.payload.roomID, action.payload.isEditorLocked, sk.broadcastToRoom);
        sk.broadcastToRoom(room, action);
      }
    }

  }
  
}