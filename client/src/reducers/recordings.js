export default function reducer(state={
  recordings: [],
  didReceiveEdits: false,
  recordedEdits: []
}, action) {

  switch(action.type) {
    case 'UPDATE_ROOM_STATE': {
      const roomRecordings = [...state.recordings];
      roomRecordings.push(action.payload.recordings);
      return {...state, recordings: roomRecordings}
    }
    case 'UPDATE_REC_LIST': {
      const newRecs = [...state.recordings];
      newRecs[0].unshift(action.payload);
      return {...state, recordings: newRecs}
    }
    case 'RECORDED_EDITS_SUCCESS': {
      return {...state, didReceiveEdits: action.payload.didReceiveEdits}
    }
    case 'STORE_RECORDED_EDITS': {
      return {...state, recordedEdits: action.payload.recordedEdits}
    }
    case 'REMOVE_REC_FROM_LIST': {
      const recList = [...state.recordings];
      const newList = recList[0].filter((rec) => {
        rec.id !== action.payload.id;
      })
      return {...state, recordings: newList}
    }
  }
  return state;
}

// TODO add on recorded edits failure
