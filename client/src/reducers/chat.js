export default function reducer(state = {
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
      console.log('TESTING',...state.messages);
      console.log('payload', action.payload);
      newMessages[0].push(action.payload);
      console.log(newMessages);
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
