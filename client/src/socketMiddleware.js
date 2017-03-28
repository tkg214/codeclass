export default (socket) => (store) => (next) => (action) => {
  if (action.meta) {
    console.log('Socket sending: ', action)
    const room = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);
    action.room = room
    socket.emit('action', action)
  }
  return next(action);
}

// apply type to only fire when necessary
