import axios from 'axios';
import Rx from 'rxjs/Rx';

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

export function changeEditorTheme(fontSize, theme) {
  return dispatch => {
    dispatch({
      type: 'CHANGE_EDITOR_THEME',
      meta: {remote: true},
      payload: {
        userSettings: { fontSize, theme }
      }
    })
  }
}

export function saveToGist(gistName, content, language) {
  let extension;
  switch (language) {
  case 'javascript':
    extension = '.js';
    break;
  case 'ruby':
    extension = '.rb';
    break;
  case 'python':
    extension = '.py';
    break;
  }
  return dispatch => {
    dispatch({
      type: 'GIST_SAVING',
      payload: {
        saveStatus: 'Saving...'
      }
    })
    axios.post('/savegist', {
      data: {
        title: gistName,
        content,
        extension
      }
    }).then((response) => {
      dispatch({
        type: 'GIST_SAVED',
        payload: {
          saveStatus: 'Complete',
          details: {
            timestamp: response.headers.date,
            text: `Saved ${gistName}${extension}`,
            response
          }
      }});
      setTimeout(() =>
      dispatch({
        type: 'GIST_DEFAULT',
        payload: {
          saveStatus: 'Save'
        }
      }), 3000)
    }).catch((error) => {
      dispatch({
        type: 'GIST_ERROR',
        payload: {
          saveStatus: 'Failed',
          details: {
            timestamp: error.headers.date,
            text: `Failed to save ${gistName}${extension}`,
            error
          }
      }});
    });
  }
}

export function changeFontSize(fontSize, theme) {
  return dispatch => {
    dispatch({
      type: 'CHANGE_FONT_SIZE',
      meta: {remote: true},
      payload: {
        userSettings: { fontSize, theme }
      }
    })
  }
}

export function selectRecording(recordingID) {
  return dispatch => {
    dispatch({
      type: 'GET_RECORDING_STREAM',
      payload: { recordingID }
    })
    axios.get('/api/recorded_edits?id=' + recordingID.slice(2))
    .then((response) => {
      dispatch({
        type: 'RECORDED_EDITS_SUCCESS',
        payload: {
          didReceiveEdits: true,
          editorValue: ''
        }
      })
      dispatch({
        type: 'STORE_RECORDED_EDITS',
        payload: {
          recordedEdits: response.data
        }
      })
    })
    .catch(() => {
      dispatch({
        type: 'RECORDED_EDITS_FAILURE',
        payload: {didReceiveEdits: false}
      })
    })
  }
}

export function updateEditorFromRecording(recordedEditsArray) {
  return dispatch => {
    const RATE_MS = 25;
    // transfer server algo to here and reconstruct
    // TODO audio node has its own timer
    // TODO use json column for edits and get rid of observable need. dispatch as reedux events
    const observable = Rx.Observable.interval(RATE_MS).take(recordedEditsArray.length).map(t => recordedEditsArray[t]);
    observable.subscribe(t => {
      dispatch({
        type: 'UPDATE_EDITOR_FROM_REC',
        payload: {
          editorValue: t.content
        }
      })
    })
  }
}
