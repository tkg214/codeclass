import React, { Component } from 'react';
import GistContainer from './GistContainer.jsx';
import EditorContainer from './EditorContainer.jsx';
import Terminal from './Terminal.jsx'

class EnvContainer extends Component {

  render() {
    return (
      <div className='env-container'>
        <div className='env-nav-container'>
          <GistContainer/>
          <button className='btn btn-primary btn-sm'>Run</button>
        </div>
        <EditorContainer/>
        <Terminal/>
      </div>
    )
  }
}

export default EnvContainer;
