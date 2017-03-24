import { ActionTypes } from './constants/ActionTypes';

export function updateEditorValues(val) {
  return {
    type: 'UPDATE_EDITOR_VALUES',
    payload: {
      value: val
    }
  }
}
