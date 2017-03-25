export default function reducer(state={
  isEditorLocked: false,
  isChatLocked: false
}, action) {
  switch (action.type) {
    case 'TOGGLE_EDITOR_LOCK':
      return {...state, isEditorLocked: action.payload.isEditorLocked}
    case 'TOGGLE_CHAT_LOCK':
      return {...state, isChatLocked: action.payload.isChatLocked}
  }
  return state
}
