import React, { Component } from 'react';
import Navbar from './nav/Navbar.jsx';
import EnvContainer from './env/EnvContainer.jsx';
import ChatContainer from './chat/ChatContainer.jsx';

class RoomApp extends Component {

  render() {
    const { socket } = this.props;
    return (
      <div>
        <Navbar/>
        <main>
          <EnvContainer/>
          <ChatContainer/>
        </main>
      </div>
    )
  }
}

export default RoomApp;
