export default function reducer(state={}, action) {
  switch (action.type) {
    case 'GIST_SAVED': {
      console.log('Gist saved payload: ', action.payload)
      return {...state, isGistSaved: action.payload.isGistSaved}
    }
    case 'GIST_ERROR': {
      console.log('Gist errorpayload: ': action.payload)
      return {...state, isGistSaved: action.payload.isGistSaved}
    }
  }
  return state;
}
