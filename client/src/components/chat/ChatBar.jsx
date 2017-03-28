import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/chat';

class ChatBar extends Component {
  render() {

    return (
      <div className="chatNotificationBar">
        <div className="chatNotificationBar-toggle">
          <button
            className="btn btn-default btn-sm .bar-button">
            <span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
          </button>
        </div>
        <div>
          <button
            className="btn btn-primary btn-sm users-connected-button">
            <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
            <br></br>
             <span className="badge">4</span>
          </button>
        </div>
        <div>
          <button
            className="btn btn-primary btn-sm users-connected-button">
            <span className="glyphicon glyphicon-comment" aria-hidden="true"></span>
            <br></br>
             <span className="badge">4</span>
          </button>
        </div>
      </div>
    );
  }

}

export default ChatBar;
