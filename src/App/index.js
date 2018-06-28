import React, { Component } from 'react';
import { Panel } from 'react-bootstrap'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="es-typo-window">
        <Panel bsStyle="primary">
          <Panel.Heading>Etersoft Typos</Panel.Heading>
          <Panel.Body>You want to correct this typo: $s</Panel.Body>
          <Panel.Footer>Panel footer!</Panel.Footer>
        </Panel>
      </div>
    );
  }
}

export default App;
