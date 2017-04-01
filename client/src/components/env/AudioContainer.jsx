import React, { Component } from 'react';

class AudioContainer extends Component {

  render() {

    const { socket } = this.props;
    socket.on('started-stream', () => {
      console.log('started-stream')
    });

    socket.on('prepare-stream', () => {
      console.log('prepare-stream')
    });

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
    e.preventDefault();
    this.props.socket.emit('start-stream')
  }
}

export default AudioContainer;
