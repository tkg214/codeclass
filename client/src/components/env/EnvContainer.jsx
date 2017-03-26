import React, { Component } from 'react';
import GistContainer from './GistContainer.jsx';
import EditorContainer from './EditorContainer.jsx';
import Terminal from './Terminal.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import axios from 'axios';
import * as Actions from '../../actions/editor';

class EnvContainer extends Component {

  render() {
    let { roomControls } = this.props;
    let editorButton = roomControls.isEditorLocked ? 'EDITOR LOCK MODE' : 'EDITOR EDIT MODE'
    let chatButton = roomControls.isChatLocked ? 'CHAT LOCK MODE' : 'CHAT EDIT MODE'
    return (
      <div className='env-container'>
        <div className='env-nav-container'>
          <GistContainer/>
          <button onClick={this._onChatToggleClick.bind(this)} className='btn btn-primary btn-sm'>{chatButton}</button>
          <button onClick={this._onEditorToggleClick.bind(this)} className='btn btn-primary btn-sm'>{editorButton}</button>
          <button onClick={this._onRunClick.bind(this)} className='btn btn-primary btn-sm'>Run</button>
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

  _onRunClick(e) {
    e.preventDefault();
    this.props.actions.executeCode(this.props.editor.value);
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
