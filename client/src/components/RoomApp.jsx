import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navbar from './nav/Navbar.jsx';
import EnvContainer from './env/EnvContainer.jsx';
import ChatContainer from './chat/ChatContainer.jsx';
import ChatBar from './chat/ChatBar.jsx';

class RoomApp extends Component {

  render() {
    return (
      <main>
        <EnvContainer/>
        <ChatContainer/>
        <ChatBar/>
      </main>
    )
  }
}

export default RoomApp;
