// Application entry point

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import RoomApp from './components/RoomApp.jsx';
import io from 'socket.io-client';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducer from './reducers';
import socketMiddleware from './socketMiddleware.js';

const app = document.getElementById('react-root');

// Instantiate socket and use socket as middleware in redux flow
// See ./socketMiddleware.js for middleware
const room = window.location.pathname.split('/');

const socket = io();
//socket.emit('join', room[2]);
const socketData = { roomUrl : room[2], user : 'tester523'}
socket.emit('join', JSON.stringify(socketData));

const createStoreWithMiddleware = applyMiddleware(
  socketMiddleware(socket), thunk, logger()
)(createStore);
const store = createStoreWithMiddleware(reducer);

socket.on('action', (action) => {
  console.log('Socket received: ', action);
  store.dispatch({type: action.type, payload: action.payload});
});

ReactDOM.render(<Provider store={store}>
  <RoomApp/>
</Provider>, app);
