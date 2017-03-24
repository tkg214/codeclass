import React, { Component } from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';

class EditorContainer extends Component {

  render() {

    const value = 'Need to adjust layout for environment containers. The red borders are just for visual aid'
    return (
      <div className='editor-container'>
        <AceEditor
          id = "editor"
          className ='editor'
          mode="javascript"
          theme="monokai"
          name="blah2"
          fontSize={10}
          defaultValue={value}
        />
      </div>
    )
  }
}

export default EditorContainer;
