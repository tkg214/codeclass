import React, { Component } from 'react';

class Terminal extends Component {

  render() {
    return (
      <div className='terminal'>
        {this.props.terminal.map((outputs) => {
          console.log('output: ', outputs);
          if (outputs.response.stdout) {
            return <p key={outputs.timestamp}> > {outputs.response.stdout}</p>
          }
       
        })}
      </div>
    )
  }
}

export default Terminal;

// Terminal not styled yet. This component only shows the state change. It is very dumb :)
