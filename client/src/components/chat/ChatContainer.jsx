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
    let visibility = roomControls.isChatVisible ? 'show' : 'close'
    console.log('chat-container', visibility);

    return (
      <div className={'chat-container ' + visibility }>
        <button
          className="btn btn-info chat-toggle-button"
          onClick={this._handleClick.bind(this)}>
          <span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span>

        </button>
      <div>
          <UserCountContainer chat={chat} actions={this.props.actions}/>
          <MessageListContainer chat={chat}/>
          <MessageComposeContainer actions={this.props.actions} roomControls={roomControls}/>
        </div>
      </div>
    )
  }

  _handleClick(e) {
    e.preventDefault();
    // this.props.actions.toggleChatContainer(this.props.roomControls.isChatVisible);
    this.props.actions.toggleChatNotificationBar(this.props.roomControls.isChatNotificationVisible);
    this.props.actions.toggleChatContainer(this.props.roomControls.isChatVisible);

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
