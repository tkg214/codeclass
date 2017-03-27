export default (socket) => (store) => (next) => (action) => {
  if (action.meta) {
    console.log('Socket sending: ', action)
    action.room = window.location.pathname;
    socket.emit('action', action)
  }
  return next(action);
}

// apply type to only fire when necessary
