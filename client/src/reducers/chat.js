export default function reducer(state = {
  messages: [],
  currentMessagesCount: 0
}, action) {
  switch(action.type) {
    case 'UPDATE_ROOM_STATE': {
      const roomMessages = [...state.messages];
      roomMessages.push(action.payload.messages)
      return {...state, messages: roomMessages}
    }
    case 'RECEIVE_NEW_MESSAGE': {
      const newMessages = [...state.messages];
      newMessages[0].push(action.payload);
      return {...state, messages: newMessages}
    }
    case 'SEND_OUTGOING_MESSAGE': {
      return state;
    }
    case 'UPDATE_NEW_MESSAGES_COUNT': {
      return {...state, currentMessagesCount: action.payload}
    }
  }
  return state;
}
