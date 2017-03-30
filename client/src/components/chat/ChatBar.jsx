import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/chat';

class ChatBar extends Component {

  render() {
    const { roomControls, chat, onlineUsers } = this.props;
    let visibility = roomControls.isChatNotificationVisible ? 'show' : 'notification-close';
    let message = chat.messages[0] || [];

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
            <div className="bar-button-contents">
            <i className='fa fa-users fa-lg'></i>
            <br></br>
             <span className="badge">{onlineUsers.usersOnline.length}</span>
             </div>
          </button>
        </div>
        <div>
          <button
            className="btn btn-primary users-connected-button bar-button">
            <div className="bar-button-contents">
            <i className='fa fa-comments fa-lg'></i>
            <br></br>
             <div className="badge">{message.length}</div>
           </div>
          </button>
        </div>
      </div>
    )
  }

  _handleClick(e){
    e.preventDefault();
    this.props.actions.toggleChatContainer(this.props.roomControls.isChatVisible);
    this.props.actions.toggleChatNotificationBar(this.props.roomControls.isChatNotificationVisible);

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
