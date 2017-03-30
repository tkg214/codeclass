import React, { Component } from 'react';

class AudioContainer extends Component {

  render() {
    console.log(this.props.p2p)

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
    // window.AudioContext = window.AudioContext || window.webkitAudioContext
    // navigator.getUserMedia({ audio: true }, (stream) => {
    //   const audioContext = new window.AudioContext();
    //   const mediaStreamSource = audioContext.createMediaStreamSource(stream);
    //   const mediaStreamDestination = audioContext.createMediaStreamDestination();
    //   mediaStreamSource.connect(mediaStreamDestination);
    //
  //
  //   })
  //   e.preventDefault();
  //   const room = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);
  //   data.room = room
  //   p2p.emit('start-stream', data)
  }
}

export default AudioContainer;
