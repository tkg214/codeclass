module.exports = function makeSocketHelpers(io, socket, room) {
  return {
    broadcastToRoom : (room, action, cb) => {
      socket.broadcast.to(room).emit('action', action);
    },
    emitToUser : (action) => {
      socket.emit('action', action);
    },
    broadcastToRoomInclusive: (room, action) => {
      io.in(room).emit('action', action);
    },

    id: () => {
      return socket.id;
    },
    token: () => {
      return socket.decoded_token;
    },

    room: () => {
      return room;
    }
  }
}