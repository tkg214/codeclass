export default function reducer(state={}, action) {
  switch (action.type) {
    case 'GIST_SAVED': {
      console.log(action.payload)
      return {...state, isGistSaved: action.payload.isGistSaved}
    }
    case 'GIST_ERROR': {
      return {...state, isGistSaved: action.payload.isGistSaved}
    }
  }
  return state;
}
