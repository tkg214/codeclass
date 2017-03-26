export default function reducer(state=[], action) {
  switch(action.type) {
    case 'EXECUTE_CODE' : {
      const dateNow = Date.now();
      return [...state, {response: action.payload, timestamp: dateNow.toString()}];
    }

  }
  return state;
}