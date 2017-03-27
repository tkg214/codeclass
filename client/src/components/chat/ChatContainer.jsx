import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/chat';

import ChatHeader from './ChatHeader.jsx';
import UserCountContainer from './UserCountContainer.jsx';
import MessageListContainer from './MessageListContainer.jsx';
import MessageComposeContainer from './MessageComposeContainer.jsx';

class ChatContainer extends Component {

  render() {
    const { chat, roomControls } = this.props
    let chatToggleButton = roomControls.isChatVisible ? 'Close Chat' : 'Open Chat'
    let visibility = roomControls.isChatVisible ? 'show' : 'hide'

    return (
      <div>
        <button
          className="btn btn-default btn-sm chat-toggle-button"
          onClick={this._handleClick.bind(this)}
          >{chatToggleButton}
        </button>
        <div className='chat-container' className={visibility}>
          <UserCountContainer />
          <MessageListContainer chat={chat}/>
          <MessageComposeContainer actions={this.props.actions}/>
        </div>
      </div>
    )
  }

  _handleClick(e) {
    e.preventDefault();
    this.props.actions.toggleChatContainer(this.props.roomControls.isChatVisible)
  }

}

function mapStateToProps(state) {
  return {
    chat: state.chat,
    roomControls: state.roomControls
   }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);

// export default ChatContainer;

// This container is supposed to be pretty smart. Its children are supposed to be dumb :P
// The control and messagecompose containers are a bit smarter than the others
