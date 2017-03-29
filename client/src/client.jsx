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

//Get the room_key from a url of thr structure http://host/rooms/:room_key
const room = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);

//Get request to get token for current user
axios.get('/api/get_token')
  .then(function (response) {
    if (response.error) {
      throw new Error(response.error);
    }
    connect_socket(response.data.token);
  })
  .catch(function (error) {
    console.log(error);
  });

//Open socket connection to authenticated users
function connect_socket(token) {
  const socket = io.connect( {
    query: 'token=' + token
  });

  socket.on('connect', function() {
    socket.emit('join', room);
  }).on('disconnect', function() {
    console.log('disconnected');

  });



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
