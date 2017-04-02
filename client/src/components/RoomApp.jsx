import React, { Component, PropTypes } from 'react';
import EnvContainer from './env/EnvContainer.jsx';
import ChatContainer from './chat/ChatContainer.jsx';
import ChatBar from './chat/ChatBar.jsx';

class RoomApp extends Component {

  render() {
    return (
      <main>
        <EnvContainer socket={this.props.socket}/>
        <ChatContainer/>
        <ChatBar/>
      </main>
    )
  }
}

RoomApp.propTypes = {
  socket: PropTypes.object.isRequired
}

export default RoomApp;
