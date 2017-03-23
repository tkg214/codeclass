import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
import EnvContainer from './EnvContainer.jsx';
import ChatContainer from './ChatContainer.jsx';

class RoomApp extends Component {

  render() {
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
