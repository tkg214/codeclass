import React, { Component, PropTypes } from 'react';

class EnvHeader extends Component {

  render() {
    const { roomTitle, language } = this.props;
    let languageHeader;

    const languageIcon = {
      javascript: "icon-javascript-alt",
      ruby: "icon-ruby",
      python: "icon-python"
    }
    const cssClasses = `fa room-language-icon ${languageIcon[language]}`

    // if (language === 'javascript') {
    //   languageHeader = 'JavaScript';
    // } else if (language === 'markdown') {
    //   languageHeader = '';
    // } else {
    //   languageHeader = language.charAt(0).toUpperCase() + language.slice(1);
    // }

    return (
      <div className='env-nav-panel'>
        <span className={cssClasses} aria-hidden="true"></span>        
        <p><strong>Topic:</strong>&ensp;{roomTitle}&ensp;&ensp;</p>
      </div>
    )
  }
}

EnvHeader.PropTypes = {
  roomTitle: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired
}

export default EnvHeader;
