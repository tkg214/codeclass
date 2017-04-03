import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/chat';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import UserCountContainer from './UserCountContainer.jsx';
import MessageListContainer from './MessageListContainer.jsx';
import MessageComposeContainer from './MessageComposeContainer.jsx';
import EnvHeader from './EnvHeader.jsx';


class ChatContainer extends Component {

  handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  }

  render() {
    const { chat, roomControls, onlineUsers } = this.props
    let visibility = roomControls.isChatVisible ? 'open' : 'close'
    // Tabs.setUseDefaultStyles(false);
    return (
      <div className={'chat-container ' + visibility }>
        <div className="sidebar-tabs">
          <div
            className="sidebar-tab chat-toggle-button"
            onClick={this._handleClick.bind(this)}>
            <div className="close-sidebar-btn"><i className='fa fa-chevron-right'></i></div>
          </div>
        </div>
      <Tabs onSelect={this.handleSelect} selectedIndex={2}>
        <TabList className="sidebar-tablist">
          <Tab className="sidebar-tab">Users online</Tab>
          <Tab className="sidebar-tab mui--text-button">Chatroom</Tab>
        </TabList>

        <TabPanel className="sidebar-panel">
          <EnvHeader roomTitle={roomControls.roomTitle} language={roomControls.language}/>
          <UserCountContainer chat={chat} actions={this.props.actions} users={onlineUsers}/>
        </TabPanel>

        <TabPanel>
          <MessageListContainer chat={chat}/>
          <MessageComposeContainer 
            actions={this.props.actions} 
            isChatLocked={roomControls.isChatLocked}
            roomID={roomControls.roomID} />
        </TabPanel>
      </Tabs>
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
    //this.props.actions.updateNewMessagesCount(messageList.length);
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
