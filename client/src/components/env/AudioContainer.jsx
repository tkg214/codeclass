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
  //
  // componentDidMount() {
  //   ss(socket).on('playback-stream', (arrayBuffer, meta) => {
  //     this.state.sampleRate = meta.sampleRate;
  //     audioContext = new AudioContext();
  //     let source = audioContext.createBufferSource();
  //     audioContext.decodeAudioData(arrayBuffer, (buffer) => {
  //       source.buffer = buffer;
  //       source.connect(audioContext.destination);
  //       source.start(audioContext.currentTime);
  //     })
  //   })
  // }

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

  render() {
    const { actions, isAuthorized, recordings } = this.props;

    // TODO add pause feature
    // TODO stop stream does not work if other actions are fired
    // TODO add multiple recording on same page... errors with quality on 1 + n stream
    // TODO get rid of click sound only at start of recording
    // TODO fix onStopStreamClick so it emits

    return (
      <div className='col-lg-6'>
        <div className='env-nav-panel'>
          <div id ='audioPanel' className='panel panel-default'>
            {isAuthorized &&
              <button className='btn env-btn btn-primary btn-sm' onClick={this._onStartLiveStreamClick.bind(this)}><i className='fa fa-microphone'></i>&ensp;Start Recording</button>
            }
            {isAuthorized &&
              <button className='btn env-btn btn-primary btn-sm' onClick={this._onStopLiveStreamClick.bind(this)}><i className='fa fa-stop-circle'></i>&ensp;Stop Recording</button>
            }
            <RecordingsListContainer actions={actions} recordings={recordings}/>
            {recordings.didReceiveEdits &&
              <button className='btn env-btn btn-primary btn-sm' onClick={this._onPlayRecordedEdits.bind(this)}><i className='fa fa-play'></i>&ensp;Play Session</button>
            }
          </div>
        </div>
      </div>
    )
  }

  // play audio on select
  _onPlayRecordedEdits(e) {
    e.preventDefault();
    this.props.actions.updateEditorFromRecording(this.props.recordings.recordedEdits)
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
