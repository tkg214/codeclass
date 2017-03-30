import React, { Component } from 'react';

class EnvControls extends Component {

  render() {
    const { roomControls } = this.props;
    const themes = ['Monokai', 'Github', 'Kuroir', 'Textmate', 'Solarized Dark', 'Solarized Light', 'Terminal'];
    const fontSizes = [8, 9, 11, 12, 14, 18, 24, 30, 36, 48];

    return (
      <div className='col-lg-12'>
        <div className='env-nav-controls'>
          <div className="btn-group env-btn btn btn-primary btn-sm">
            <a className="dropdown-toggle" data-toggle="dropdown"><i className='fa fa-paint-brush'></i>&ensp;Theme<span className="caret"></span></a>
            <ul className="dropdown-menu">
              {themes.map((theme, i) => {
                return <li key={i}><a onClick={this._onThemeChangeClick.bind(this)}>{theme}</a></li>
              })}
            </ul>
          </div>
          <div className="btn-group env-btn btn btn-primary btn-sm">
            <a className="dropdown-toggle" data-toggle="dropdown">A<span className='sm'> A</span>&ensp;Font Size<span className="caret"></span></a>
            <ul className="dropdown-menu">
              {fontSizes.map((fontSize, i) => {
                return <li key={i}><a onClick={this._onFontSizeChangeClick.bind(this)}>{fontSize}</a></li>
              })}
            </ul>
          </div>
          {roomControls.isAuthorized && roomControls.isChatLocked &&
            <button onClick={this._onChatToggleClick.bind(this)} className='btn btn-primary btn-sm env-btn'><i className='fa fa-lock'></i>&ensp;Chat Locked</button>
          }
          {!roomControls.isAuthorized && roomControls.isChatLocked &&
            <button className='btn btn-primary btn-sm disabled env-btn'><i className='fa fa-lock'></i>&ensp;Chat Locked</button>
          }
          {roomControls.isAuthorized && !roomControls.isChatLocked &&
            <button onClick={this._onChatToggleClick.bind(this)} className='btn btn-primary btn-sm env-btn'><i className='fa fa-unlock'></i>&ensp;Chat Unlocked</button>
          }
          {!roomControls.isAuthorized && !roomControls.isChatLocked &&
            <button className='btn btn-primary btn-sm disabled env-btn'><i className='fa fa-unlock'></i>&ensp;Chat Unlocked</button>
          }
          {roomControls.isAuthorized && roomControls.isEditorLocked &&
            <button onClick={this._onEditorToggleClick.bind(this)} className='btn btn-primary btn-sm env-btn'><i className='fa fa-lock'></i>&ensp;Editor Locked</button>
          }
          {!roomControls.isAuthorized && roomControls.isEditorLocked &&
            <button className='btn btn-primary btn-sm disabled env-btn'><i className='fa fa-lock'></i>&ensp;Editor Locked</button>
          }
          {roomControls.isAuthorized && !roomControls.isEditorLocked &&
            <button onClick={this._onEditorToggleClick.bind(this)} className='btn btn-primary btn-sm env-btn'><i className='fa fa-unlock'></i>&ensp;Editor Unlocked</button>
          }
          {!roomControls.isAuthorized && !roomControls.isEditorLocked &&
            <button className='btn btn-primary btn-sm disabled env-btn'><i className='fa fa-unlock'></i>&ensp;Editor Unlocked</button>
          }
          {(roomControls.isAuthorized || !roomControls.isEditorLocked) &&
            <button onClick={this._onRunClick.bind(this)} className='btn btn-primary btn-sm env-btn'><i className='fa fa-play'></i>&ensp;Run</button>
          }
          {(!roomControls.isAuthorized && roomControls.isEditorLocked) &&
            <button className='btn btn-primary btn-sm disabled env-btn'><i className='fa fa-play'></i>&ensp;Run</button>
          }
        </div>
      </div>
    );
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
    console.log(this.props.editorValue)
    this.props.actions.executeCode(this.props.roomControls.language, this.props.editorValue);
  }
}

export default EnvControls;
