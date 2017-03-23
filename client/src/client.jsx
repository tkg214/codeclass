// Application entry point

// Load application styles
require('../styles/application.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';

import RoomApp from './components/RoomApp.jsx';

const app = document.getElementById('react-root');

ReactDOM.render(<Provider store={store}>
  <RoomApp />
</Provider>, app);
