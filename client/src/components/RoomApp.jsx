import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navbar from './nav/Navbar.jsx';
import EnvContainer from './env/EnvContainer.jsx';
import ChatContainer from './chat/ChatContainer.jsx';
// import Actions from '../actions/roomControls';
// import axios from 'axios';

class RoomApp extends Component {
  
  render() {
    // if (!this.props.user) {
    //   return null;
    // }
    return (
      <main>
        <EnvContainer/>
        <ChatContainer/>
      </main>
    )
  }
}

// function mapDispatchToProps(dispatch) {
//   return { actions: bindActionCreators(Actions, dispatch) }
// }
// export default connect(null, mapDispatchToProps)(RoomApp);
export default RoomApp;
