// Root reducer that combines all other reducers

import { combineReducers } from 'redux';
import chat from './chat';
import editor from './editor';
import roomControls from './roomControls';
import terminal from './terminal';

export default combineReducers({
  chat,
  editor,
  roomControls,
  terminal
});
