import React, { Component } from 'react';
import UserCountContainer from './UserCountContainer.jsx';
import ControlContainer from './ControlContainer.jsx';
import MessageListContainer from './MessageListContainer.jsx';
import MessageComposeContainer from './MessageComposeContainer.jsx';

class ChatContainer extends Component {

  render() {
    return (
      <div className='chat-container'>
        <UserCountContainer/>
        <ControlContainer/>
        <MessageListContainer/>
        <MessageComposeContainer/>
      </div>
    )
  }
}

export default ChatContainer;
