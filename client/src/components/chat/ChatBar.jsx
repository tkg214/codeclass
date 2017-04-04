import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/chat';


class ChatBar extends Component {

  constructor() {
    super();
    this.state = {
      lastCount: 0,

    }
  }

  componentWillReceiveProps(){
    console.log('componentWillReceiveProps');
  }
  componentWillUpdate(){
    console.log('componentWillUpdate');
  }
  componentDidUpdate(){
    const { roomControls } = this.props;
    console.log('roomControls', roomControls.isFirstRender);
    console.log('componentDidUpdate');
  }


  componentDidMount(){
    console.log('componentDidMount loaded');
    //
    // const { roomControls, chat, actions } = this.props;
    //
    // let  messages = chat.messages[0] || [];
    // // console.log(roomControls.isFirstRender);
    // if(roomControls.isFirstRender){
    //   this.setState({lastCount: messages.length});
    //   actions.toggleFirstRender(roomControls.isFirstRender);
    //   console.log('test');
    //
    // }


  }

  render() {
    const { roomControls, chat, onlineUsers } = this.props;
    let visibility = roomControls.isChatNotificationVisible ? 'show' : 'notification-close';
    let  messages = chat.messages[0] || [];
    // console.log(this.state.lastCount);

    let messageCount = (roomControls.isChatNotificationVisible) ? (messages.length - this.state.lastCount) : 0;
    // console.log((roomControls.isChatNotificationVisible) ? 'messages.length - this.state.lastCount' : 0 );
    // let containerCount = chat.currentMessagesCount.currentMessagesCount || 0; //new number
    // let messageList = messages.length > containerCount ? messages.length : containerCount;

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
             <span className="badge">{ messageCount }</span>
          </button>
        </div>
      </div>
    )
  }

  _handleClick(e){
    e.preventDefault();
    const { chat, roomControls, actions } = this.props;
    let messageList = chat.messages[0] || [];
    this.setState({lastCount: messageList.length})
    actions.toggleChatContainer(roomControls.isChatVisible);
    actions.toggleChatNotificationBar(roomControls.isChatNotificationVisible);
    // actions.updateNewMessagesCount(messageList.length);
    console.log('chat container', roomControls.isChatVisible);
    console.log('chat notif', roomControls.isChatNotificationVisible);
    // this.setState({})
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

ChatBar.propTypes = {
  actions: PropTypes.shape({
    toggleChatContainer: PropTypes.func.isRequired,
    toggleChatNotificationBar: PropTypes.func.isRequired,
    updateNewMessagesCount: PropTypes.func.isRequired
  }),
  chat: PropTypes.object.isRequired,
  roomControls: PropTypes.object.isRequired,
  onlineUsers: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBar);
