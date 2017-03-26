export default function reducer(state ={
  messages: []
}, action) {

  switch(action.type) {
    case 'SEND_OUTGOING_MESSAGE': {
      const newMessages = [...state.messages];
      newMessages.push(action.payload)
      return {...state, messages: newMessages}
    }
  }
  return state;
}
