export default function reducer(state={
  value: ''
}, action) {
  switch (action.type) {
    case 'UPDATE_EDITOR_VALUES': {
      return {...state, value: action.payload.value};
    }
  }
  return state;
}
