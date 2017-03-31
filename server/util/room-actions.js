module.exports = function makeRoomHelpers(socketHelpers, room, clients) {
  const clientData = socketHelpers.token();

  return {
    addToClientsStore : function() {
      //Check if room object is already initialized
      if (!clients.hasOwnProperty(room)) {
        clients[room] = [];
      }
      //Check if client is already in room
      const clientInRoom = clients[room].filter((client) => {
        return client.name === clientData.github_login;
      });

      if (clientInRoom.length === 0) {
        clients[room].push({id: socketHelpers.id(), name : clientData.github_login, avatar : clientData.github_avatar});
      }
    },
    emitRoomData : function(roomData) {
      roomOwnerID = roomData.roomOwnerID;
      delete roomData.roomOwnerID;
      let action = {type: 'UPDATE_ROOM_STATE', payload: roomData}
      socketHelpers.emitToUser(action);
    }
  }
}