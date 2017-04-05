export default function reducer(state={
  saveStatus: 'Save',
  toasts: []
}, action) {
  switch (action.type) {
    case 'GIST_DEFAULT':
    case 'GIST_SAVING':
      return {...state, saveStatus: action.payload.saveStatus}
    case 'GIST_SAVED':
    case 'GIST_ERROR': {
      const gistToasts = [...state.toasts];
      gistToasts.push(action.payload.details);
      return {...state, saveStatus: action.payload.saveStatus, toasts: gistToasts};
    }
  }
  return state;
}
