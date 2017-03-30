import React, { Component } from 'react';

class EnvHeader extends Component {

  render() {
    const { roomControls } = this.props;
    let language;
    if (roomControls.language === 'javascript') {
      language = 'JavaScript';
    } else if (roomControls.language === 'markdown') {
      language = '';
    } else {
      language = roomControls.language.charAt(0).toUpperCase() + roomControls.language.slice(1);
    }

    return (
      <div className='col-lg-6'>
        <div className='env-nav-panel'>
          <div className='panel panel-default'>
            <div className='panel-body'>
              Topic:&ensp;{roomControls.roomTitle}&ensp;&ensp;
              Language:&ensp;{language}&ensp;
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EnvHeader;
