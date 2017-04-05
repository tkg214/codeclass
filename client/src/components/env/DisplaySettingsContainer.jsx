/*import React, { Component, PropTypes } from 'react';

class DisplaySettings extends Component {

  render() {
    const themes = ['Monokai', 'Github', 'Kuroir', 'Textmate', 'Solarized Dark', 'Solarized Light', 'Terminal'];
    const fontSizes = [8, 9, 11, 12, 14, 18, 24, 30, 36, 48];

    return(
    <div>
      <div className="btn-group env-btn dropup">
        <a className="dropdown-toggle" data-toggle="dropdown"><i className='fa fa-paint-brush'></i>&ensp;Theme<span className="caret"></span></a>
        <ul className="dropdown-menu">
          {themes.map((theme, i) => {
            return <li key={i}><a onClick={this._onThemeChangeClick.bind(this)}>{theme}</a></li>
          })}
        </ul>
      </div>
       <div className="btn-group env-btn btn btn-primary btn-sm dropup">
        <a className="dropdown-toggle" data-toggle="dropdown">A<span className='sm'> A</span>&ensp;Font Size<span className="caret"></span></a>
        <ul className="dropdown-menu">
          {fontSizes.map((fontSize, i) => {
            return <li key={i}><a onClick={this._onFontSizeChangeClick.bind(this)}>{fontSize}</a></li>
          })}
        </ul>
      </div>
    </div>
    );
  }

  _onThemeChangeClick(e) {
    e.preventDefault();
    const text = e.target.text.toLowerCase();
    const theme = text.split(' ').join('_');
    this.props.actions.changeEditorTheme(this.props.fontSize, theme);
  }

  _onFontSizeChangeClick(e) {
    e.preventDefault();
    const fontSize = e.target.text;
    this.props.actions.changeFontSize(Number(fontSize), this.props.theme);
  }
}

DisplaySettings.propTypes = {
  actions: PropTypes.shape({
    changeEditorTheme: PropTypes.func.isRequired,
    changeFontSize: PropTypes.func.isRequired,
    toggleEditorLock: PropTypes.func.isRequired,
    toggleChatLock: PropTypes.func.isRequired
  }),
  theme: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  editorValue: PropTypes.string.isRequired,
  roomID: PropTypes.number.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  isChatLocked: PropTypes.bool.isRequired,
  isEditorLocked: PropTypes.bool.isRequired

}

export default DisplaySettings;*/