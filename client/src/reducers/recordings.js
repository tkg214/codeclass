export default function reducer(state={
  recordings: []
}, action) {

  switch(action.type) {
    case 'UPDATE_ROOM_STATE': {
      const roomRecordings = [...state.recordings];
      roomRecordings.push(action.payload.recordings);
      return {...state, recordings: roomRecordings}
    }
  }
  return state;
}
