export default function reducer(state ={
  messages: [],
  usersOnline: [1]
}, action) {

  switch(action.type) {
    case 'SEND_OUTGOING_MESSAGE': {
      const newMessages = [...state.messages];
      newMessages.push(action.payload);
      return {...state, messages: newMessages}
      break;
    }
    case 'UPDATE_USERS_ONLINE': {
      console.log('users received', action.payload);

      return {...state, usersOnline: action.payload}
      break;
    }
  }
  return state;
}
