import React, { Component } from 'react';

class Terminal extends Component {

  render() {
    return (
      <div className='terminal'>

        <pre>{this.props.editor}</pre>
      </div>
    )
  }
}

export default Terminal;

// Terminal not styled yet. This component only shows the state change. It is very dumb :)
