export default function reducer(state={
  usersOnline: [{id: '', name: '', avatar: ''}]
}, action) {
  switch(action.type) {
    case 'UPDATE_USERS_ONLINE': {
      return {...state, usersOnline: action.payload.usersOnline};
    }
  }
  return state;
}
