module.exports = function makeActionHandlers(room, dbHelpers, sk, rm) {
  
  return {
    UPDATE_EDITOR_VALUES : (action) => {
      console.log("updateEditorValues called");
      if (roomOwnerId === clientData.id) {
        dbHelpers.updateEditorValues(action.payload.roomID, action.payload.editorValue, sk.broadcastToRoom);
        sk.broadcastToRoom(room, action);
      }
    }

  }
  
}