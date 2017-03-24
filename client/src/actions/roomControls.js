import { ActionTypes } from './constants/ActionTypes';

export function requestRoomState() {
  return {
    type: ActionTypes.ROOM_SETTINGS_REQUEST
  };
}

export function getRoomState() {
  return dispatch => {
    dispatch(requestRoomState());
  }
}
