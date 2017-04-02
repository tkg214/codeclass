const initialState = {
  isChatVisible: false,
  roomTitle: '',
  roomID: 0,
  isChatNotificationVisible: true,
  isAuthorized: false,
  isEditorLocked: true,
  isChatLocked: true,
  userSettings: {
    tabSize: 2,
    theme: 'monokai',
    fontSize: 12,
  },
  language: 'markdown'
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'UPDATE_ROOM_STATE': {
      return {...state,
        roomID: action.payload.roomID,
        roomTitle: action.payload.roomTitle,
        isAuthorized: action.payload.isAuthorized,
        isEditorLocked: action.payload.isEditorLocked,
        isChatLocked: action.payload.isChatLocked,
        language: action.payload.language,
        userSettings: action.payload.userSettings
      }
    }
    case 'TOGGLE_EDITOR_LOCK': {
      return {...state, isEditorLocked: action.payload.isEditorLocked}
    }
    case 'TOGGLE_CHAT_LOCK': {
      return {...state, isChatLocked: action.payload.isChatLocked}
    }
    case 'CHANGE_EDITOR_THEME': {
      return {...state, userSettings: action.payload.userSettings}
    }
    case 'TOGGLE_CHAT_CONTAINER': {
      return {...state, isChatVisible: action.payload.isChatVisible}
    }
    case 'CHANGE_FONT_SIZE': {
      return {...state, userSettings: action.payload.userSettings}
    }
    case 'TOGGLE_CHAT_NOTIFICATION_BAR': {
      return {...state, isChatNotificationVisible: action.payload.isChatNotificationVisible}
    }
  }
  return state;
}

// add logic here to control state of room
