import axios from 'axios';
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
    axios.post('http://52.33.39.121/api', {
      lang : "javascript",
      code : code
    })
    .then(function (response) {
      dispatch({type: 'EXECUTE_CODE', meta: {remote: true},  payload: response.data});
    })
    .catch(function (error) {
      dispatch({type: 'EXECUTE_CODE_ERR', meta: {remote: true},  payload: error});
    });
    
  }
}
