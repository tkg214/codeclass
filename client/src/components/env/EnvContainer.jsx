import React, { Component } from 'react';
import GistContainer from './GistContainer.jsx';
import EditorContainer from './EditorContainer.jsx';
import Terminal from './Terminal.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/editor';

class EnvContainer extends Component {

  render() {
    let { editor, roomControls } = this.props;
    let editorButton = roomControls.isEditorLocked ? 'Editor Locked' : 'Editor Unlocked'
    let chatButton = roomControls.isChatLocked ? 'Chat Locked' : 'Chat Unlocked'
    const themes = ['Monokai', 'Github', 'Tomorrow', 'Kuroir', 'xCode', 'Textmate', 'Solarized Dark', 'Solarized Light', 'Terminal']
    const fontSizes = [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28]

    // TODO change dropdown menu buttons to work for entire

    return (
      <div className='env-container'>
        <div className='env-nav-container row'>
          <GistContainer actions={this.props.actions} gist={this.props.gist} language={roomControls.language} editor={editor.editorValue}/>
          <div className='col-lg-6'>
            <div className='env-nav-controls'>
              <div className="btn-group env-btn btn btn-primary btn-sm">
                <a className="dropdown-toggle" data-toggle="dropdown">Theme<span className="caret"></span></a>
                <ul className="dropdown-menu">
                  {themes.map((theme, i) => {
                    return <li key={i}><a onClick={this._onThemeChangeClick.bind(this)}>{theme}</a></li>
                  })}
                </ul>
              </div>
              <div className="btn-group env-btn btn btn-primary btn-sm">
                <a className="dropdown-toggle" data-toggle="dropdown">Font Size<span className="caret"></span></a>
                <ul className="dropdown-menu">
                  {fontSizes.map((fontSize, i) => {
                    return <li key={i}><a onClick={this._onFontSizeChangeClick.bind(this)}>{fontSize}</a></li>
                  })}
                </ul>
              </div>
              {roomControls.isAuthorized &&
                <button onClick={this._onChatToggleClick.bind(this)} className='btn btn-primary btn-sm env-btn'>{chatButton}</button>
              }
              {roomControls.isAuthorized &&
                <button onClick={this._onEditorToggleClick.bind(this)} className='btn btn-primary btn-sm env-btn'>{editorButton}</button>
              }
              {(roomControls.isAuthorized || !roomControls.isEditorLocked) &&
                <button onClick={this._onRunClick.bind(this)} className='btn btn-primary btn-sm env-btn'>Run</button>
              }
            </div>
          </div>
        </div>

        <EditorContainer actions={this.props.actions} editor={editor.editorValue} roomControls={roomControls}/>
        <Terminal terminal={this.props.terminal}/>
      </div>
    )
  }

  _onThemeChangeClick(e) {
    e.preventDefault();
    const text = e.target.text.toLowerCase();
    const theme = text.split(' ').join('_');
    this.props.actions.changeEditorTheme(theme);
  }

  _onFontSizeChangeClick(e) {
    e.preventDefault();
    const fontSize = e.target.text;
    this.props.actions.changeFontSize(fontSize);
  }

  _onEditorToggleClick(e) {
    e.preventDefault();
    this.props.actions.toggleEditorLock(this.props.roomControls.isEditorLocked, this.props.roomControls.roomID);
  }

  _onChatToggleClick(e) {
    e.preventDefault();
    this.props.actions.toggleChatLock(this.props.roomControls.isChatLocked, this.props.roomControls.roomID);
  }

  _onRunClick(e) {
    e.preventDefault();
    this.props.actions.executeCode(this.props.editor.editorValue);
  }
}


function mapStateToProps(state) {
  return {
    editor: state.editor,
    roomControls: state.roomControls,
    terminal: state.terminal,
    gist: state.gist
   }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnvContainer);
