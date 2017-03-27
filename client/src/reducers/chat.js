export default function reducer(state ={
  messages: [],
  usersOnline: []
}, action) {
  switch(action.type) {
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
      console.log(newUsers);
      return {...state, usersOnline: newUsers}
      break;
    }
  }
  return state;
}
