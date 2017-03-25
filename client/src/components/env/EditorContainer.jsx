import React, { Component } from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';

class EditorContainer extends Component {

  constructor() {
    super();
    this.width = $(window).width() - $('.chat-container').width();
  }

  render() {
    const { editor } = this.props;

    return (
      <div className='editor-container'>
        <AceEditor
          className ='editor'
          mode="javascript"
          theme="monokai"
          name="blah2"
          fontSize={10}
          onChange={this._onChange.bind(this)}
          width={`${this.width}`}
          value={editor}
        />
      </div>
    )
  }

  _onChange(newValue) {
    this.props.actions.updateEditorValues(newValue)
  }
}

export default EditorContainer;
