import React, { Component, PropTypes } from 'react';

class EnvControls extends Component {

  render() {
    const { isAuthorized, isChatLocked, isEditorLocked } = this.props;
    const themes = ['Monokai', 'Github', 'Kuroir', 'Textmate', 'Solarized Dark', 'Solarized Light', 'Terminal'];
    const fontSizes = [8, 9, 11, 12, 14, 18, 24, 30, 36, 48];
    return (
      <div className='col-lg-12'>
        <div className='env-nav-controls'>
          {/*<div className="btn-group env-btn">
            <a className="dropdown-toggle" data-toggle="dropdown"><i className='fa fa-paint-brush'></i>&ensp;Theme<span className="caret"></span></a>
            <ul className="dropdown-menu">
              {themes.map((theme, i) => {
                return <li key={i}><a onClick={this._onThemeChangeClick.bind(this)}>{theme}</a></li>
              })}
            </ul>
          </div>*/}
          <div className="btn-group env-btn btn btn-primary btn-sm">
            <a className="dropdown-toggle" data-toggle="dropdown">A<span className='sm'> A</span>&ensp;Font Size<span className="caret"></span></a>
            <ul className="dropdown-menu">
              {fontSizes.map((fontSize, i) => {
                return <li key={i}><a onClick={this._onFontSizeChangeClick.bind(this)}>{fontSize}</a></li>
              })}
            </ul>
          </div>
          {isAuthorized && isChatLocked &&
            <button onClick={this._onChatToggleClick.bind(this)} className='btn btn-primary btn-sm env-btn'><i className='fa fa-lock'></i>&ensp;Chat Locked</button>
          }
          {!isAuthorized && isChatLocked &&
            <button className='btn btn-primary btn-sm disabled env-btn'><i className='fa fa-lock'></i>&ensp;Chat Locked</button>
          }
          {isAuthorized && !isChatLocked &&
            <button onClick={this._onChatToggleClick.bind(this)} className='btn btn-primary btn-sm env-btn'><i className='fa fa-unlock'></i>&ensp;Chat Unlocked</button>
          }
          {!isAuthorized && !isChatLocked &&
            <button className='btn btn-primary btn-sm disabled env-btn'><i className='fa fa-unlock'></i>&ensp;Chat Unlocked</button>
          }
          {isAuthorized && isEditorLocked &&
            <button onClick={this._onEditorToggleClick.bind(this)} className='btn btn-primary btn-sm env-btn'><i className='fa fa-lock'></i>&ensp;Editor Locked</button>
          }
          {!isAuthorized && isEditorLocked &&
            <button className='btn btn-primary btn-sm disabled env-btn'><i className='fa fa-lock'></i>&ensp;Editor Locked</button>
          }
          {isAuthorized && !isEditorLocked &&
            <button onClick={this._onEditorToggleClick.bind(this)} className='btn btn-primary btn-sm env-btn'><i className='fa fa-unlock'></i>&ensp;Editor Unlocked</button>
          }
          {!isAuthorized && !isEditorLocked &&
            <button className='btn btn-primary btn-sm disabled env-btn'><i className='fa fa-unlock'></i>&ensp;Editor Unlocked</button>
          }
          {(isAuthorized || !isEditorLocked) &&
            <button onClick={this._onRunClick.bind(this)} className='btn btn-primary btn-sm env-btn'><i className='fa fa-play'></i>&ensp;Run</button>
          }
          {(!isAuthorized && isEditorLocked) &&
            <button className='btn btn-primary btn-sm disabled env-btn'><i className='fa fa-play'></i>&ensp;Run</button>
          }
        </div>
      </div>
    );
  }

  // _onThemeChangeClick(e) {
  //   e.preventDefault();
  //   const text = e.target.text.toLowerCase();
  //   const theme = text.split(' ').join('_');
  //   this.props.actions.changeEditorTheme(this.props.fontSize, theme);
  // }

  _onFontSizeChangeClick(e) {
    e.preventDefault();
    const fontSize = e.target.text;
    this.props.actions.changeFontSize(Number(fontSize), this.props.theme);
  }

  _onEditorToggleClick(e) {
    e.preventDefault();
    this.props.actions.toggleEditorLock(this.props.isEditorLocked, this.props.roomID);
  }

  _onChatToggleClick(e) {
    e.preventDefault();
    this.props.actions.toggleChatLock(this.props.isChatLocked, this.props.roomID);
  }

  _onRunClick(e) {
    e.preventDefault();
    this.props.actions.executeCode(this.props.language, this.props.editorValue);
  }
}

EnvControls.propTypes = {
  actions: PropTypes.shape({
    // changeEditorTheme: PropTypes.func.isRequired,
    changeFontSize: PropTypes.func.isRequired,
    toggleEditorLock: PropTypes.func.isRequired,
    toggleChatLock: PropTypes.func.isRequired,
    executeCode: PropTypes.func.isRequired
  }),
  // theme: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  editorValue: PropTypes.string.isRequired,
  roomID: PropTypes.number.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  isChatLocked: PropTypes.bool.isRequired,
  isEditorLocked: PropTypes.bool.isRequired

}

export default EnvControls;
