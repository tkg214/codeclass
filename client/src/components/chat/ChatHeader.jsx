import React, { Component } from 'react';

class ChatHeader extends Component {
  render() {
    const { isChatVisible } = this.props;
    let chatToggleButton = isChatVisible ? 'Close Chat' : 'Open Chat'

    return (
      <div>
        <header className='chat-header'>
          <button
            className="btn btn-default btn-sm chat-toggle-button"
            onClick={this._handleClick.bind(this)}
            >{chatToggleButton}</button>
        </header>
      </div>
    );
  }

  _handleClick(e) {
    e.preventDefault();
    this.props.actions.toggleChatContainer(this.props.isChatVisible)
  }
}

export default ChatHeader;
