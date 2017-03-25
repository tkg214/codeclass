export function updateEditorValues(val) {
  return dispatch => {
    dispatch({
      type: 'UPDATE_EDITOR_VALUES',
      meta: {remote: true},
      payload: {
        value: val
      }
    })
  }
}

export function toggleEditorLock(isEditorLocked) {
  console.log(isEditorLocked)
  return dispatch => {
    dispatch({
      type: 'TOGGLE_EDITOR_LOCK',
      meta: {remote: true},
      payload: {
        isEditorLocked: isEditorLocked ? false : true
      }
    })
  }
}

export function toggleChatLock(isChatLocked) {
  return dispatch => {
    dispatch({
      type: 'TOGGLE_CHAT_LOCK',
      meta: {remote: true},
      payload: {
        isChatLocked: isChatLocked ? false : true
      }
    })
  }
}

export function executeCode(code) {
  return dispatch => {
    dispatch({
      type: 'CLICK_RUN_BUTTON',
      meta: {remote: true}
    });
    setTimeout(dispatch({type: 'EXECUTE_CODE', payload: code}), 1000);
  }
}
