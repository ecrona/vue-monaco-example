export const editorSnippet = `
import React, Component from 'react';
import render from 'react-dom';
import Hello from './hello';
import './style.css';



  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <p>
          Start editing to see some magic happen :)
        </p>
      </div>
    );
  }
}

`.trim();

export const tutorialSnippet = `
class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }
`.trim();
