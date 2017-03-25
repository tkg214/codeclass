export default function reducer(state=[], action) {
  switch(action.type) {
    case 'EXECUTE_CODE' : {
      return [...state, action.payload]
      break;
    }
  }
  return state;
}