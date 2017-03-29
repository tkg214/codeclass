// Root reducer that combines all other reducers

import { combineReducers } from 'redux';
import chat from './chat';
import editor from './editor';
import roomControls from './roomControls';
import terminal from './terminal';
import gist from './gist';
import onlineUsers from './onlineUsers';

export default combineReducers({
  chat,
  editor,
  roomControls,
  terminal,
  gist,
  onlineUsers
});
