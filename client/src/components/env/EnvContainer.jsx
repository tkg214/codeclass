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

    let editorButton = roomControls.isEditorLocked ? 'Editor Locked' : 'Editor Unlocked'
    let chatButton = roomControls.isChatLocked ? 'Chat Locked' : 'Chat Unlocked'
    return (
      <div className='env-container'>
        <div className='env-nav-container'>
          <GistContainer/>
          <div className="btn-group">
            <a className="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown">Theme<span className="caret"></span></a>
            <ul className="dropdown-menu">
              <li><a onClick={this._onThemeChangeClick.bind(this)}>Monokai</a></li>
              <li><a >GitHub</a></li>
              <li><a >Tomorrow</a></li>
              <li><a >Kuroir</a></li>
              <li><a >xCode</a></li>
              <li><a >Textmate</a></li>
              <li><a >Solarized Dark</a></li>
              <li><a >Solarized Light</a></li>
              <li><a >Terminal</a></li>
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

  _onThemeChangeClick(e) {
    e.preventDefault();
    const theme = e.target.text.toLowerCase();
    this.props.actions.changeEditorTheme(theme);
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
