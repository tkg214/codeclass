// Application entry point

// Load application styles
require('./styles/application.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './src/store'
import RoomApp from './src/components/RoomApp.jsx';

const app = document.getElementById('react-root');

ReactDOM.render(<Provider store={store}>
  <RoomApp />
</Provider>, app);
