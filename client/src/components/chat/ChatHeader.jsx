import React, { Component } from 'react';

class ChatHeader extends Component {
  render() {
    return (
      <div>
        <header className='chat-header'>
          <button type="button" className="btn btn-default btn-lg chat-toggle-button">
            Open/close
          </button>

        </header>
      </div>
    );
  }
}
export default ChatHeader;
