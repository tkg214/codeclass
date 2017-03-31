import React, { Component } from 'react';

class AudioContainer extends Component {

  render() {

    return (
      <div className='col-lg-6'>
        <div className='env-nav-panel'>
          <div className='panel panel-default'>
            <button className='btn btn-primary btn-sm' onClick={this._startStream.bind(this)}>Start Stream</button>

          </div>
        </div>
      </div>
    )
  }

  _startStream(e) {
    
  }
}

export default AudioContainer;
