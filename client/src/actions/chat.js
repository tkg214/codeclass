import axios from 'axios';
import Rx from 'rxjs/Rx';

export function sendMessage(content, roomID){
  return dispatch => {
    dispatch({
      type: 'SEND_OUTGOING_MESSAGE',
      meta: {remote: true},
      payload: {
        content,
        roomID
      }
    })
  }
}
export function updateUsers(usersOnline){
  return dispatch => {
    dispatch({
      type: 'UPDATE_USERS_ONLINE',
      meta: {remote: false},
      payload: {
        // user_id will be passed from req.session.user.id
        // user_id: 1,
        // classroom_id will be passed down from iniitial state.
        // classroom_id: 2,
        timestamp: Date.now(),
        usersOnline
      }
    })
  }
}
export function toggleChatContainer(isChatVisible){
  return dispatch => {
    dispatch({
      type: 'TOGGLE_CHAT_CONTAINER',
      payload: {
        isChatVisible: isChatVisible ? false : true
      }
    })
  }
}

export function toggleChatNotificationBar(isChatNotificationVisible){
  return dispatch => {
    dispatch({
      type: 'TOGGLE_CHAT_NOTIFICATION_BAR',
      payload: {
        isChatNotificationVisible: isChatNotificationVisible ? false : true
      }
    })
  }
}

export function updateNewMessagesCount(currentMessagesCount){
  return dispatch => {
    dispatch({
      type: 'UPDATE_NEW_MESSAGES_COUNT',
      payload: {
        currentMessagesCount: currentMessagesCount
      }
    })
  }
}

export function toggleFirstRender(toggle){
  console.log('dispatched');
  return dispatch => {
    dispatch({
      type: 'TOGGLE_FIRST_RENDER',
      payload: {
        isFirstRender: toggle ? false : true
      }
    })
  }
}

export function switchSidebarTab(index){
  return dispatch => {
    dispatch({
      type: 'SWITCH_SIDEBAR_TAB',
      payload: {
        currentTab: index
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


// TODO add error and success messages
export function deleteRecording(recordingID) {
  return dispatch => {
    axios.post('/api/recorded_edits', {
      data: {
        id: recordingID.slice(2)
      }
    }).then(() => {
      dispatch({
        type: 'REMOVE_REC_FROM_LIST',
        meta: {remote: true},
        payload: {
          id: recordingID
        }
      })
    })
  }
}


// TODO take until
// TODO use epics in redux

export function updateEditorFromRecording(recordedEditsArray, currentTime) {
  return dispatch => {
    const RATE_MS = 25;
    const i = Math.round(currentTime / 25);
    const intervalArray = recordedEditsArray.slice(i)
    const observable = Rx.Observable.interval(RATE_MS).take(intervalArray.length).map(t => intervalArray[t]);
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


// TODO LOCK MESSEAGES

// TODO USERS LOGGED IN


// STRETCH TODOS
// USER IS TYPING...
// EMOTICONS
