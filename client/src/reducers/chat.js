export default function reducer(state ={
  messages: []
}, action) {

  switch(action.type) {
    case 'UPDATE_ROOM_STATE': {
      const roomMessages = [...state.messages];
      roomMessages.push(action.payload.messages)
      return {...state, messages: roomMessages}
    }
    case 'SEND_OUTGOING_MESSAGE': {
      const newMessages = [...state.messages];
      newMessages.push(action.payload)
      return {...state, messages: newMessages}
    }
  }
  return state;
}
