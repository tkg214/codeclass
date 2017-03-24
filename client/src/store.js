import { applyMiddleware, createStore } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducer from './reducers';

let socket = io('http://localhost:3000');

let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/')

const middleware = applyMiddleware(promise(), thunk, logger());

export default createStore(reducer, middleware);
