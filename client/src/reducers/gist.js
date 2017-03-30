export default function reducer(state={
  save: 'Save',
  toasts: []
}, action) {
  switch (action.type) {
    case 'GIST_DEFAULT':
    case 'GIST_SAVING':
      return {...state, save: action.payload.save}
    case 'GIST_SAVED':
    case 'GIST_ERROR': {
      const gistToasts = [...state.toasts];
      gistToasts.push(action.payload.details);
      return {...state, save: action.payload.save, toasts: gistToasts};
    }
  }
  return state;
}
