import React, { Component } from 'react';

class Terminal extends Component {

  render() {
    return (
      <div className='terminal'>
        {this.props.terminal.map((outputs) => {
          
          if (outputs.response.stdout) {
            const stdOut = outputs.response.stdout.replace(/\n/g, "<br />");
            console.log(stdOut);
            return <code key={outputs.timestamp}> > {stdOut}</code>
          }

          if (outputs.response.stdrr) {
            const stdErr = outputs.response.stderr;
            console.log(stdErr);
            return <code key={outputs.timestamp}> > {outputs.response.stderr}</code>
          }
        })}
      </div>
    )
  }
}

export default Terminal;

// Terminal not styled yet. This component only shows the state change. It is very dumb :)
