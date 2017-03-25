//TODO normalize this
const initialState = {
  isAuthorized: true,
  isEditorLocked: true,
  isChatLocked: true,
  editorValue: '',
  terminalValue: '',
  usersOnline: [{
    name: '',
    avatarURL: ''
  }],
  messages: [{
    content: '',
    name: '',
    timestamp: 0
  }],
  isScrolled: true,
  language: '',
  userSettings: [{
    theme: '',
    mode: '',
    tabSize: 2,
    defaultValue: '',
    isReadOnly: false
  }]
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'UPDATE_ROOM_STATE': {
      // const { isAuthorized, isEditorLocked, isChatLocked, editorValue,
      //   terminalValue, usersOnline, messages, isScrolled,
      //   language, userSettings } = action.payload
      // let newState = {
      //   isAuthorized: action.payload.isAuthorized,
      //   isEditorLocked: action.payload.isEditorLocked,
      //   isChatLocked: action.payload.isChatLocked,
      //   editorValue: action.payload.editorValue,
      //   terminalValue: action.payload.terminalValue,
      //   usersOnline: action.payload.usersOnline,
      //   messages: action.payload.messages,
      //   isScrolled: action.payload.isScrolled,
      //   language: action.payload.language,
      //   userSettings: action.payload.userSettings
      // }
        // TODO the code below won't work because STATE IS IMMUTABLE
      return {...state,
        isAuthorized: action.payload.isAuthorized,
        isEditorLocked: action.payload.isEditorLocked,
        isChatLocked: action.payload.isChatLocked,
        editorValue: action.payload.editorValue,
        terminalValue: action.payload.terminalValue,
        usersOnline: action.payload.usersOnline,
        messages: action.payload.messages,
        isScrolled: action.payload.isScrolled,
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
    default: return state;
  }
  return state
}

// add logic here to control state of room
