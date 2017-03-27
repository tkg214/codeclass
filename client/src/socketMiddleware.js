export default (socket) => (store) => (next) => (action) => {
  if (action.meta) {
    console.log('Socket sending: ', action)
    const room = window.location.pathname.split('/');
    action.room = room[2]
    socket.emit('action', action)
  }
  return next(action);
}

// apply type to only fire when necessary
