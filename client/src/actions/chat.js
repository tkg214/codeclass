export function sendMessage(content, roomID){
  return dispatch => {
    dispatch({
      type: 'SEND_OUTGOING_MESSAGE',
      meta: {remote: true},
      payload: {
        content,
        roomID
      }
    })
  }
}
export function updateUsers(usersOnline){
  return dispatch => {
    dispatch({
      type: 'UPDATE_USERS_ONLINE',
      meta: {remote: false},
      payload: {
        // user_id will be passed from req.session.user.id
        // user_id: 1,
        // classroom_id will be passed down from iniitial state.
        // classroom_id: 2,
        timestamp: Date.now(),
        usersOnline
      }
    })
  }
}
export function toggleChatContainer(isChatVisible){
  return dispatch => {
    dispatch({
      type: 'TOGGLE_CHAT_CONTAINER',
      payload: {
        isChatVisible: isChatVisible ? false : true
      }
    })
  }
}

export function toggleChatNotificationBar(isChatNotificationVisible){
  return dispatch => {
    dispatch({
      type: 'TOGGLE_CHAT_NOTIFICATION_BAR',
      payload: {
        isChatNotificationVisible: isChatNotificationVisible ? false : true
      }
    })
  }
}

export function updateNewMessagesCount(currentMessagesCount){
  return dispatch => {
    dispatch({
      type: 'UPDATE_NEW_MESSAGES_COUNT',
      payload: {
        currentMessagesCount: currentMessagesCount
      }
    })
  }
}


// TODO LOCK MESSEAGES

// TODO USERS LOGGED IN


// STRETCH TODOS
// USER IS TYPING...
// EMOTICONS
