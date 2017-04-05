import React, { Component, PropTypes } from 'react';
import RecordingsListContainer from './RecordingsListContainer.jsx';
import ss from 'socket.io-stream';

class AudioContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bufferSize: 2048,
      constraints: {audio: true},
      isRecording: false,
      sampleRate: null
    }
    this.audioContext;
    this.audioInput;
    this.recorder;
    this.isRecording;
    this.socketStream;
    this.localStream;
  }

  // TODO enable buffering
  componentDidMount() {
    const audio = document.getElementById('audio-player');
    ss(this.props.socket).on('playback-stream', (stream, meta) => {
      let buffer = [];
      stream.on('data', (chunk) => {
        buffer.push(chunk);
      });
      stream.on('end', () => {
        audio.src = window.URL.createObjectURL(new Blob(buffer));
      })
    })
  }

  _onStartLiveStreamClick(e) {
    e.preventDefault();
    if (this.props.isAuthorized && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(this.state.constraints).then((stream) => {
        this._onSuccess(stream);
      })
    }
  }

  _onSuccess(stream) {
    if (this.state.isRecording) {
      this.props.socket.emit('stop-stream');
      this.socketStream.end();
      this.localStream.getTracks()[0].stop();
      this.setState({isRecording: false});
    }
    this.setState({isRecording: true});
    this.localStream = stream;
    this.audioContext = new AudioContext();
    this.socketStream = new ss.createStream();
    this.setState({sampleRate: this.audioContext.sampleRate});
    this.audioInput = this.audioContext.createMediaStreamSource(this.localStream);
    this.recorder = this.audioContext.createScriptProcessor(this.state.bufferSize, 1, 1);
    this.recorder.onaudioprocess = this._processInput.bind(this);
    this.audioInput.connect(this.recorder);
    this.recorder.connect(this.audioContext.destination);
    ss(this.props.socket).emit('start-stream', this.socketStream, {sampleRate: this.state.sampleRate});
  }

  _processInput(e) {
    const leftChannel = e.inputBuffer.getChannelData(0);
    this.state.isRecording && this.socketStream.write( new ss.Buffer(this._convertFloat32ToInt16(leftChannel)));
  }

  _convertFloat32ToInt16(buffer) {
    let l = buffer.length;
    let buf = new Int16Array(l);
    while (l--) {
      buf[l] = Math.min(1, buffer[l]) * 0x7FFF;
    }
    return buf.buffer;
  }

  _onStopLiveStreamClick(e) {
    e.preventDefault();
    if (this.state.isRecording) {
      this.props.socket.emit('stop-stream');
      this.socketStream.end();
      this.localStream.getTracks()[0].stop();
      this.setState({isRecording: false});
    }
  }

  // play audio on select
  _onPlayRecordedEdits(e) {
    e.preventDefault();
    const audio = document.getElementById('audio-player');
    const currentTime = Math.round(audio.currentTime * 1000);
    const totalTime = Math.round(audio.duration * 1000);
    this.props.actions.updateEditorFromRecording(this.props.recordings.recordedEdits, currentTime, totalTime);
  }

  _onPauseRecordedEdits(e) {
    e.preventDefault();
  }

  render() {
    const { actions, isAuthorized, recordings } = this.props;

    // TODO add pause feature
    // TODO add multiple recording on same page... errors with quality on 1 + n stream
    // TODO add on seeked feakture

    return (
      <div className='col-lg-12'>
        <div className='env-nav-panel'>
          <div id ='audioPanel' className='panel panel-default'>
            {isAuthorized && !this.state.isRecording &&
              <button className='btn env-btn btn-primary btn-sm' onClick={this._onStartLiveStreamClick.bind(this)}><i className='fa fa-microphone'></i>&ensp;Start Recording</button>
            }
            {isAuthorized && this.state.isRecording &&
              <button className='btn env-btn btn-primary btn-sm disabled'><i className='fa fa-microphone'></i>&ensp;Start Recording</button>
            }
            {isAuthorized && this.state.isRecording &&
              <button className='btn env-btn btn-primary btn-sm' onClick={this._onStopLiveStreamClick.bind(this)}><i className='fa fa-stop-circle'></i>&ensp;Stop Recording</button>
            }
            {isAuthorized && !this.state.isRecording &&
              <button className='btn env-btn btn-primary btn-sm disabled'><i className='fa fa-stop-circle'></i>&ensp;Stop Recording</button>
            }
            <RecordingsListContainer actions={actions} recordings={recordings} isAuthorized={isAuthorized}/>
            <audio id='audio-player' onPause={this._onPauseRecordedEdits.bind(this)} onPlay={this._onPlayRecordedEdits.bind(this)} controls></audio>
          </div>
        </div>
      </div>
    )
  }
}

AudioContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  recordings: PropTypes.object.isRequired
}

export default AudioContainer;

// TODO add pause, add stop, sync pause and play, add stop recording, add pause recording, add live web rtc
