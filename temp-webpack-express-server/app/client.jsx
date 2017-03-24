// Application entry point

// Load application styles
require('./styles/application.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import RoomApp from './src/components/RoomApp.jsx';
import io from 'socket.io-client';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducer from './src/reducers';
import socketMiddleware from './src/socketMiddleware.js';

const app = document.getElementById('react-root');

const socket = io();

const createStoreWithMiddleware = applyMiddleware(
  socketMiddleware(socket), promise(), thunk, logger()
)(createStore);
const store = createStoreWithMiddleware(reducer);

socket.on('action', (action) => {
  console.log('Socket received: ', action)
  store.dispatch({type: action.type, payload: action.payload});
});

ReactDOM.render(<Provider store={store}>
  <RoomApp/>
</Provider>, app);
