export default function reducer(state={
  value: ''
}, action) {
  console.log('something is happening')
  switch (action.type) {
    case 'UPDATE_EDITOR_VALUES': {
      return {...state, value: action.payload}
    }
  }

  return state
}
