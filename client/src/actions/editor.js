import { ActionTypes } from './constants/ActionTypes';

export function updateEditorValues(val) {
  return {
    type: ActionTypes.UPDATE_EDITOR_VALUES,
    payload: {
      value: val
    }
  }
}
