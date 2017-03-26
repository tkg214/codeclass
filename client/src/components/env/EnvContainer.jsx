import React, { Component } from 'react';
import GistContainer from './GistContainer.jsx';
import EditorContainer from './EditorContainer.jsx';
import Terminal from './Terminal.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/editor';

class EnvContainer extends Component {

  render() {
    let { roomControls } = this.props;
    console.log(roomControls)

    let editorButton = roomControls.isEditorLocked ? 'EDITOR LOCK MODE' : 'EDITOR EDIT MODE'
    let chatButton = roomControls.isChatLocked ? 'CHAT LOCK MODE' : 'CHAT EDIT MODE'
    return (
      <div className='env-container'>
        <div className='env-nav-container'>
          <GistContainer/>
          <div className="btn-group">
            <a className="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown-menu">Settings<span className="caret"></span></a>
            <ul className="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li className="divider"></li>
              <li><a href="#">Separated link</a></li>
            </ul>
          </div>

          {roomControls.isAuthorized &&
            <button onClick={this._onChatToggleClick.bind(this)} className='btn btn-primary btn-sm'>{chatButton}</button>
          }
          {roomControls.isAuthorized &&
            <button onClick={this._onEditorToggleClick.bind(this)} className='btn btn-primary btn-sm'>{editorButton}</button>
          }
          {(roomControls.isAuthorized || !roomControls.isEditorLocked) &&
            <button className='btn btn-primary btn-sm'>Run</button>
          }
        </div>
        <EditorContainer actions={this.props.actions} editor={this.props.editor.value}/>
        <Terminal/>
      </div>
    )
  }

  _onEditorToggleClick(e) {
    e.preventDefault();
    this.props.actions.toggleEditorLock(this.props.roomControls.isEditorLocked);
  }

  _onChatToggleClick(e) {
    e.preventDefault();
    this.props.actions.toggleChatLock(this.props.roomControls.isChatLocked);
  }
}

function mapStateToProps(state) {
  return {
    editor: state.editor,
    roomControls: state.roomControls
   }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnvContainer);
