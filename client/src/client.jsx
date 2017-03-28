// Application entry point

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import RoomApp from './components/RoomApp.jsx';
import io from 'socket.io-client';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
// import promise from 'redux-promise-middleware';
import reducer from './reducers';
import socketMiddleware from './socketMiddleware.js';
import './helpers/resize.js';
import axios from 'axios';

const app = document.getElementById('react-root');

// Instantiate socket and use socket as middleware in redux flow
// See ./socketMiddleware.js for middleware
const room = window.location.pathname.split('/');

axios.get('/api/get_token')
  .then(function (response) {
    if (response.error) {
      throw new Error(response.error);
    }
    console.log("client.jsx ajax response: ", response);
    console.log(response.data.token);
    connect_socket(response.data.token);
  })
  .catch(function (error) {
    console.log(error);
  });


function connect_socket(token) {
  console.log("opening socket now");
  const socket = io.connect('http://127.0.0.1:8080/rooms/', {
    query: 'token=' + token
  });

  socket.on('connect', function () {
    console.log('authenticated');
  }).on('disconnect', function () {
    console.log('disconnected');
  });

  socket.emit('join', room[2]);

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
}

// const socket = io();
//socket.emit('join', room[2]);
// const socketData = { roomUrl : room[2], user : 'tester523'}


