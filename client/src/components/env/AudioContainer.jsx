import React, { Component } from 'react';

class AudioContainer extends Component {

  render() {
    const { socket } = this.props;

    socket.on('stream', (arrayBuffer) => {
      const blob = new Blob([arrayBuffer], { 'type': 'audio/ogg; codecs=opus' });
      const audioStream = document.getElementById('audioStream');
      audioStream.src = window.URL.createObjectURL(blob);
      audioStream.play();
    })

    return (
      <div className='col-lg-6'>
        <div className='env-nav-panel'>
          <div id ='audioPanel' className='panel panel-default'>
            <button id='startButton' className='btn btn-primary btn-sm' onClick={this._startStream.bind(this)}>Start Stream</button>
            <audio id='audioStream' controls></audio>
          </div>
        </div>
      </div>
    )
  }

  _startStream(e) {
    e.preventDefault();

    const constraints = {audio: true}
    navigator.mediaDevices.getUserMedia(constraints)
    .then((mediaStream) => {
      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorder.onstart = () => {
        this.chunks = [];
      }
      mediaRecorder.ondataavailable = (e) => {
        this.chunks.push(e.data);
      }
      mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' });
        this.props.socket.emit('stream', blob);
      }
      mediaRecorder.start()
      setInterval(() => {
        mediaRecorder.stop()
        mediaRecorder.start()
      }, 500);
    })
  }


}

export default AudioContainer;
