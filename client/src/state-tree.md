room: {
  isAuthorized: boolean, //to determine if owner or not
  isEditorLocked: boolean,
  isChatLocked: boolean,
  editorValue: string,
  usersOnline: {[
    id: number,
    name: string,
    avatarURL: string
  ]},
  messages: {[
    id: number,
    content: string,
    name: string,
    avatarURL: string,
    timestamp: number
  ]},
  isScrolled: boolean //to autoscroll to bottom,
  language: string,
  userSettings: {
    theme: string,
    mode: string, //from language
    tabSize: number,
    defaultValue: string, //from editorValue,
    isReadOnly: boolean //from editorLocked
  }
}
