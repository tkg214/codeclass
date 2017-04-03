export default function reducer(state={
  editorValue: '',
}, action) {
  switch (action.type) {
    case 'UPDATE_ROOM_STATE': {
      return {...state, editorValue: action.payload.editorValue}
    }
    case 'UPDATE_EDITOR_VALUES': {
      return {...state, editorValue: action.payload.editorValue}
    }
    case 'UPDATE_EDITOR_FROM_REC': {
      return {...state, editorValue: action.payload.editorValue}
    }
  }
  return state;
}
