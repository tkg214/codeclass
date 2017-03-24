import React, { Component } from 'react';
import ChatHeader from './ChatHeader.jsx';
import UserCountContainer from './UserCountContainer.jsx';
import ControlContainer from './ControlContainer.jsx';
import MessageListContainer from './MessageListContainer.jsx';
import MessageComposeContainer from './MessageComposeContainer.jsx';

class ChatContainer extends Component {

  render() {
    return (
      <div className='chat-container'>
        <ChatHeader/>
        <UserCountContainer/>
        <ControlContainer/>
        <MessageListContainer/>
        <MessageComposeContainer/>
      </div>
    )
  }
}

export default ChatContainer;

// This container is supposed to be pretty smart. Its children are supposed to be dumb :P
// The control and messagecompose containers are a bit smarter than the others
