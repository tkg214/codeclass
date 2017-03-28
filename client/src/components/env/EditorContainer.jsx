import React, { Component } from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/mode/javascript';
import 'brace/mode/ruby';
import 'brace/mode/python';
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
    console.log(roomControls.language)

    return (
      <div className='editor-container'>
        <AceEditor
          className ='editor'
          mode={roomControls.language}
          theme={roomControls.userSettings.theme}
          name="blah2"
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
    this.props.actions.updateEditorValues(newValue)
  }
}

export default EditorContainer;
