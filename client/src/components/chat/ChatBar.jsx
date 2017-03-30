import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/chat';


class ChatBar extends Component {

  constructor() {
    super();
    this.state = {
      lastCount: 0
    }
  }


  render() {
    const { roomControls, chat, onlineUsers } = this.props;
    let visibility = roomControls.isChatNotificationVisible ? 'show' : 'notification-close';
    let messages = chat.messages[0] || [];
    let containerCount = chat.currentMessagesCount.currentMessagesCount || 0; //new number
    let messageList = messages.length > containerCount ? messages.length : containerCount;

    return (
      <div className='chat-notification-bar' id= { visibility }>
        <div className="chat-notification-bar-toggle">
          <button
            className="btn btn-info bar-button"
            onClick={this._handleClick.bind(this)}>
            <i className='fa fa-chevron-left'></i>
          </button>
        </div>
        <div>
          <button
            className="btn btn-primary users-connected-button bar-button">
            <i className='fa fa-users fa-lg'></i>
            <br></br>
             <span className="badge">{onlineUsers.usersOnline.length}</span>
          </button>
        </div>
        <div>
          <button
            className="btn btn-primary users-connected-button bar-button">
            <i className='fa fa-comments fa-lg'></i>
            <br></br>
             <span className="badge">{messageList - this.state.lastCount}</span>
          </button>
        </div>
      </div>
    )
  }


  _handleClick(e){
    e.preventDefault();
    const { chat } = this.props;
    let messageList = chat.messages[0] || [];
    this.setState({lastCount: messageList.length})
    this.props.actions.toggleChatContainer(this.props.roomControls.isChatVisible);
    this.props.actions.toggleChatNotificationBar(this.props.roomControls.isChatNotificationVisible);
    this.props.actions.updateNewMessagesCount(messageList.length);

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

export default connect(mapStateToProps, mapDispatchToProps)(ChatBar);
