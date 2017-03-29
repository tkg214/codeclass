import axios from 'axios';

export function updateEditorValues(editorValue, roomID) {
  return dispatch => {
    dispatch({
      type: 'UPDATE_EDITOR_VALUES',
      meta: {remote: true},
      payload: {
        roomID,
        editorValue
      }
    })
  }
}

export function toggleEditorLock(isEditorLocked, roomID) {
  return dispatch => {
    dispatch({
      type: 'TOGGLE_EDITOR_LOCK',
      meta: {remote: true},
      payload: {
        roomID,
        isEditorLocked: isEditorLocked ? false : true
      }
    })
  }
}

export function toggleChatLock(isChatLocked, roomID) {
  return dispatch => {
    dispatch({
      type: 'TOGGLE_CHAT_LOCK',
      meta: {remote: true},
      payload: {
        roomID,
        isChatLocked: isChatLocked ? false : true
      }
    })
  }
}

export function executeCode(lang, code) {
  return dispatch => {
    axios.post('http://ec2-52-33-39-121.us-west-2.compute.amazonaws.com/api', {
      lang : lang,
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

export function changeEditorTheme(theme) {
  return dispatch => {
    dispatch({
      type: 'CHANGE_EDITOR_THEME',
      meta: {remote: true},
      payload: {
        userSettings: {theme}
      }
    })
  }
}

export function saveToGist(gistName, content, language) {
  return dispatch => {
    axios.post('/savegist', {
      data: {
        title: gistName,
        content,
        language
      }
    }).then((response) => {
      dispatch({
        type: 'GIST_SAVED',
        payload: {
          isGistSaved: true
      }});
    }).catch((error) => {
      dispatch({
        type: 'GIST_ERROR',
        payload: {
          isGistSaved: false
      }});
    });
  }
}

export function changeFontSize(fontSize) {
  return dispatch => {
    dispatch({
      type: 'CHANGE_FONT_SIZE',
      meta: {remote: true},
      payload: {
        userSettings: {fontSize}
      }
    })
  }
}
