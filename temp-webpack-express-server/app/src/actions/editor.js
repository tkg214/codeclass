export function updateEditorValues(val) {
  return dispatch => {
    dispatch(sendUpdatedEditorValues(val));
  }
}

export function sendUpdatedEditorValues(val) {
  return {
    type: 'UPDATE_EDITOR_VALUES',
    meta: {remote: true},
    payload: {
      value: val
    }
  }
}
