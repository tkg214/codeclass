import React, { Component, PropTypes } from 'react';
import RecordingsListContainer from './RecordingsListContainer.jsx';
import ss from 'socket.io-stream';

class AudioContainer extends Component {

  render() {
    const { actions, socket, isAuthorized, recordings } = this.props;
    const constraints = {audio: true};
    let audioContext;
    let audioInput;
    let bufferSize = 2048;
    let recorder;
    let sampleRate;
    let isRecording;
    let socketStream;
    let localStream;
    let isInit;
    let audioCache = [];
    let bufferTime = 0;

    // ss(socket).on('playback-stream', (rawStream, meta) => {
    //   audioContext = new AudioContext();
    //   console.log(rawStream);
    //   let rawArray = new Float32Array(rawStream);
    //   let buffer = audioContext.createBuffer(1, bufferSize, meta.sampleRate)
    //   buffer.copyToChannel(rawArray, 0);
    //   audioCache.push(buffer);
    //   if ((isInit) || ((!isInit) && audioCache.length > 5)) {
    //     isInit = true;
    //     playCache(audioCache);
    //   }
    // })

    // if (isAuthorized && !navigator.getUserMedia) {
    //   navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUsermedia
    // }

    function playCache(cache){
      while (cache.length) {
        let buffer = cache.shift();
        let src = audioContext.createBufferSource();
        src.buffer = buffer;
        src.connect(audioContext.destination);
        if (bufferTime === 0) {
          bufferTime = audioContext.currentTime + 0.05;
        }
        src.start(bufferTime);
        bufferTime += src.buffer.duration;
      }
    }

    // TODO create error event
    function onStartStreamClick(e) {
      e.preventDefault();
      if (isAuthorized && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
          onSuccess(stream);
        })
      }
    }

    // TODO add pause feature
    // TODO stop stream does not work if other actions are fired
    // TODO add multiple recording on same page... errors with quality on 1 + n stream
    function onSuccess(stream) {
      isRecording = true;
      localStream = stream;
      audioContext = new AudioContext();
      socketStream = new ss.createStream();
      sampleRate = audioContext.sampleRate;
      audioInput = audioContext.createMediaStreamSource(localStream);
      recorder = audioContext.createScriptProcessor(bufferSize, 1, 1);
      recorder.onaudioprocess = processInput;
      audioInput.connect(recorder);
      recorder.connect(audioContext.destination);
      ss(socket).emit('start-stream', socketStream, { sampleRate });
    }

    // TODO get rid of click sound only at start of recording
    function processInput(e) {
      const leftChannel = e.inputBuffer.getChannelData(0);
      isRecording && socket.emit('live-stream', convertFloat32ToInt16(leftChannel));
      isRecording && socketStream.write( new ss.Buffer(convertFloat32ToInt16(leftChannel)));
    }

    function convertFloat32ToInt16(buffer) {
      let l = buffer.length;
      let buf = new Int16Array(l);
      while (l--) {
        buf[l] = Math.min(1, buffer[l]) * 0x7FFF;
      }
      return buf.buffer;
    }

    // TODO fix onStopStreamClick so it emits
    function onStopStreamClick(e) {
      e.preventDefault();
      if (isRecording) {
        socket.emit('stop-stream');
        socketStream.end();
        localStream.getTracks()[0].stop();
        isRecording = false;
      }
    }

    return (
      <div className='col-lg-6'>
        <div className='env-nav-panel'>
          <div id ='audioPanel' className='panel panel-default'>
            {isAuthorized &&
              <button className='btn env-btn btn-primary btn-sm' onClick={onStartStreamClick.bind(this)}><i className='fa fa-microphone'></i>&ensp;Start Recording</button>
            }
            {isAuthorized &&
              <button className='btn env-btn btn-primary btn-sm' onClick={onStopStreamClick.bind(this)}><i className='fa fa-stop-circle'></i>&ensp;Stop Recording</button>
            }
            <RecordingsListContainer actions={actions} recordings={recordings}/>
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
