import React, { Component } from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/mode/javascript';
import 'brace/mode/ruby';
import 'brace/mode/python';

//As a default setting
import 'brace/mode/markdown';

import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/terminal';
import 'brace/theme/solarized_light';
import 'brace/theme/solarized_dark';

import 'brace/ext/language_tools';

class EditorContainer extends Component {

  constructor() {
    super();
    this.width = $(window).width() - $('.chat-container').width();
  }

  render() {
    const { editor, roomControls } = this.props;
    return (
      <div className='editor-container'>
        <AceEditor
          className ='editor'
          mode={roomControls.language}
          theme={roomControls.userSettings.theme}
          fontSize={Number(roomControls.userSettings.fontSize)}
          onChange={this._onChange.bind(this)}
          width={`${this.width}`}
          value={editor}
          readOnly={roomControls.isEditorLocked}
        />
      </div>
    )
  }

  _onChange(newValue) {
    console.log('action hit')
    this.props.actions.updateEditorValues(newValue, this.props.roomControls.roomID)
  }
}

EditorContainer.propTypes = {
  roomControls: React.PropTypes.shape({
    language: React.PropTypes.string.isRequired,
    isEditorLocked: React.PropTypes.bool.isRequired,
    userSettings: React.PropTypes.shape({
      theme: React.PropTypes.string.isRequired
    })
  }),
  editor: React.PropTypes.string,
  actions: React.PropTypes.object
}

export default EditorContainer;
