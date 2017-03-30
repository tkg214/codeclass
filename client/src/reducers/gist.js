export default function reducer(state={
  gist: '',
  toasts: []
}, action) {
  switch (action.type) {
    case 'GIST_SAVING':
      return {...state, gist: action.payload.save}
    case 'GIST_SAVED':
    case 'GIST_ERROR': {
      const gistToasts = [...state.toasts];
      gistToasts.push(action.payload.details);
      return {...state, gist: action.payload.save, toasts: gistToasts};
    }
  }
  return state;
}
