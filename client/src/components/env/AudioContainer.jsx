import React, { Component, PropTypes } from 'react';
import ss from 'socket.io-stream';

class AudioContainer extends Component {

  render() {
    const { socket, isAuthorized } = this.props;
    const constraints = {audio: true};
    let audioContext;
    let audioInput;
    let bufferSize = 2048;
    let recorder;
    let sampleRate;
    let isRecording;
    let socketStream = ss.createStream();
    let isInit;
    let audioCache = [];
    let bufferTime = 0;

    // ss(socket).on('live-stream', (rawStream, meta) => {
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

    if (isAuthorized && !navigator.getUserMedia) {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUsermedia
    }

    if (!isAuthorized) {
      audioContext = new AudioContext();
    }

    // function playCache(cache){
    //   while (cache.length) {
    //     let buffer = cache.shift();
    //     let src = audioContext.createBufferSource();
    //     src.buffer = buffer;
    //     src.connect(audioContext.destination);
    //     if (bufferTime === 0) {
    //       bufferTime = audioContext.currentTime + 0.05;
    //     }
    //     src.start(bufferTime);
    //     bufferTime += src.buffer.duration;
    //   }
    // }

    // TODO create error event
    function onStartStreamClick(e) {
      e.preventDefault();
      if (isAuthorized && navigator.getUserMedia) {
        navigator.getUserMedia(constraints, onSuccess, (err) => {
          console.log('error: ', err)
        })
      }
    }

    function onSuccess(stream) {
      isRecording = true;
      audioContext = new AudioContext();
      sampleRate = audioContext.sampleRate;
      audioInput = audioContext.createMediaStreamSource(stream);
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

    // function convertInt16ToFloat32(buffer) {
    //   let l = buffer.length;
    //   let output = new Float32Array(l);
    //   while (l--) {
    //     output[l] = Math.
    //   }
    // }

    function onStopStreamClick(e) {
      e.preventDefault();
      isRecording = false;
      socket.emit('stop-stream');
      socketStream.end();
    }

    return (
      <div className='col-lg-6'>
        <div className='env-nav-panel'>
          <div id ='audioPanel' className='panel panel-default'>
            {isAuthorized &&
              <button className='btn btn-primary btn-sm' onClick={onStartStreamClick.bind(this)}>Start Stream</button>
            }
            {isAuthorized &&
              <button className='btn btn-primary btn-sm' onClick={onStopStreamClick.bind(this)}>Stop Stream</button>
            }
            {!isAuthorized &&
              <audio id='audioStream' controls></audio>
            }
          </div>
        </div>
      </div>
    )
  }
}

AudioContainer.propTypes = {
  socket: PropTypes.object.isRequired,
  isAuthorized: PropTypes.bool.isRequired
}

export default AudioContainer;
