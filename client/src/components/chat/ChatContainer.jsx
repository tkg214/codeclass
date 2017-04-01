import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/chat';

import UserCountContainer from './UserCountContainer.jsx';
import MessageListContainer from './MessageListContainer.jsx';
import MessageComposeContainer from './MessageComposeContainer.jsx';

class ChatContainer extends Component {

  render() {

    const { chat, roomControls, onlineUsers } = this.props
    let visibility = roomControls.isChatVisible ? 'show' : 'close'

    return (
      <div className={'chat-container ' + visibility }>
        <button
          className="btn btn-info chat-toggle-button"
          onClick={this._handleClick.bind(this)}>
          <i className='fa fa-chevron-right'></i>
        </button>
      <div>
          <UserCountContainer
            actions={this.props.actions}
            chat={chat}
            users={onlineUsers}/>
          <MessageListContainer chat={chat}/>
          <MessageComposeContainer
            actions={this.props.actions}
            isChatLocked={roomControls.isChatLocked}
            roomID={roomControls.roomID}/>
        </div>
      </div>
    )
  }

  _handleClick(e) {
    e.preventDefault();
    const { roomControls, chat, actions } = this.props;
    // this.props.actions.toggleChatContainer(this.props.roomControls.isChatVisible);
    actions.toggleChatNotificationBar(roomControls.isChatNotificationVisible);
    actions.toggleChatContainer(roomControls.isChatVisible);
    let messageList = chat.messages[0] || [];
    actions.updateNewMessagesCount(messageList.length);

  }

}

function mapStateToProps(state) {
  return {
    chat: state.chat,
    roomControls: state.roomControls,
    onlineUsers: state.onlineUsers
   }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) }
}

ChatContainer.propTypes = {
  actions: PropTypes.shape({
    toggleChatNotificationBar: PropTypes.func.isRequired,
    toggleChatContainer: PropTypes.func.isRequired,
    updateNewMessagesCount: PropTypes.func.isRequired
  }),
  roomControls: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  onlineUsers: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);

// export default ChatContainer;

// This container is supposed to be pretty smart. Its children are supposed to be dumb :P
// The control and messagecompose containers are a bit smarter than the others
