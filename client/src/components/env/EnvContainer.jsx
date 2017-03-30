import React, { Component } from 'react';
import GistContainer from './GistContainer.jsx';
import EditorContainer from './EditorContainer.jsx';
import Terminal from './Terminal.jsx';
import EnvControls from './EnvControls.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/editor';

class EnvContainer extends Component {

  render() {
    const { editor, roomControls, gist, actions, terminal } = this.props;
    let language;
    if (roomControls.language === 'javascript') {
      language = 'JavaScript';
    } else if (roomControls.language === 'markdown') {
      language = '';
    } else {
      language = roomControls.language.charAt(0).toUpperCase() + roomControls.language.slice(1);
    }

    return (
      <div className='env-container'>
        <div className='env-nav-container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='env-nav-panel'>
                <div className='panel panel-default'>
                  <div className='panel-body'>
                    Topic:&ensp;{roomControls.roomTitle}&ensp;&ensp;
                    Language:&ensp;{language}&ensp;
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <GistContainer actions={actions} gist={gist} language={roomControls.language} editorValue={editor.editorValue}/>
            <EnvControls actions={actions} editorValue={editor.editorValue} roomControls={roomControls}/>
          </div>
        </div>
        <EditorContainer actions={actions} editorValue={editor.editorValue} roomControls={roomControls}/>
        <Terminal terminal={terminal}/>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    editor: state.editor,
    roomControls: state.roomControls,
    terminal: state.terminal,
    gist: state.gist
   }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnvContainer);
