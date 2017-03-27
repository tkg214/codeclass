export default function reducer(state ={
  messages: [],
  usersOnline: []
}, action) {
  switch(action.type) {
    case 'UPDATE_ROOM_STATE': {
      const roomMessages = [...state.messages];
      roomMessages.push(action.payload.messages)
      return {...state, messages: roomMessages}
    }
    case 'SEND_OUTGOING_MESSAGE': {
      const newMessages = [...state.messages];
      newMessages.push(action.payload);
      return {...state, messages: newMessages}
      break;
    }
    case 'UPDATE_USERS_ONLINE': {
      console.log('FOUND THE REDUCER');
      // console.log('this is payload', action.payload)
      const newUsers = [...state.usersOnline];
      newUsers.push(action.payload)
      return {...state, usersOnline: newUsers}
      break;
    }
  }
  return state;
}
