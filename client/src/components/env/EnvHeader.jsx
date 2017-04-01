import React, { Component, PropTypes } from 'react';

class EnvHeader extends Component {

  render() {
    const { roomTitle, language } = this.props;
    let languageHeader;
    if (language === 'javascript') {
      languageHeader = 'JavaScript';
    } else if (language === 'markdown') {
      languageHeader = '';
    } else {
      languageHeader = language.charAt(0).toUpperCase() + language.slice(1);
    }

    return (
      <div className='col-lg-12'>
        <div className='env-nav-panel'>
          <div className='panel panel-default'>
            <div className='panel-body'>
              Topic:&ensp;{roomTitle}&ensp;&ensp;
              Language:&ensp;{languageHeader}&ensp;
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EnvHeader.PropTypes = {
  roomTitle: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired
}

export default EnvHeader;
