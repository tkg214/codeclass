module.exports = function makeRoomHelpers(sk, clients) {
  const clientData = sk.token();
  const room = sk.room();
  const socketId = sk.id();

  return {
    addToClientsStore : function() {
      console.log(`${clientData.github_login} is now connected to room ${room}`);
      
      //Check if room object is already initialized
      if (!clients.hasOwnProperty(room)) {
        clients[room] = [];
      }
      //Check if client is already in room
      const clientInRoom = clients[room].filter((client) => {
        return client.name === clientData.github_login;
      });

      if (clientInRoom.length === 0) {
        clients[room].push({id: sk.id(), name : clientData.github_login, avatar : clientData.github_avatar});
      }
    },
    removeFromClientsStore : function() {
      console.log(`${clientData.github_login} is now disconnected`);

      if (clients[room]) {
        //Remove disconnected client from memory store
        const clientIndex = clients[room].findIndex(client => client.id === socketId);
        if (clientIndex > -1) {
          clients[room].splice(clientIndex, 1);
        }

        //If no users are in room, delete room property from memory
        if (clients[room].length === 0) {
          delete clients[room];
        }
      }
    }
  }
}