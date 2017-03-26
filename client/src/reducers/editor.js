export default function reducer(state={
  value: '',
  userSettings: {
    theme: ''
  }
}, action) {
  switch (action.type) {
    case 'UPDATE_EDITOR_VALUES': {
      return {...state, value: action.payload.value}
    }
    case 'CHANGE_EDITOR_THEME': {
      return {...state, userSettings.theme: action.payload.userSettings.theme}
    }
  }
  return state;
}
