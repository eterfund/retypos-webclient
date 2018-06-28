import React, { Component } from 'react';
import $ from 'jquery';

import TypoModal from '../Modal/'
import {i18n} from '../Localization'

class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      correctionMode: false
    }

    this.minSelectionLength = 4;
    this.maxSelectionLength = 50;

    this.typo = "";

    this.registerHandlers();
  }

  // Returns selected text or null if no
  // text was selected
  getSelectedText() {
    return window.getSelection().toString();
  }

  // Register handlers for user input
  // CTRL+Enter should open modal with typo correction
  registerHandlers() {
    $(document).keydown(event => {
      if (event.ctrlKey && event.keyCode === 13) {
        const selection = this.getSelectedText();
        if (selection.length < this.minSelectionLength || 
          selection.length > this.maxSelectionLength) 
        {
          alert(i18n.formatString(i18n.errorSelectionLength, 
            this.minSelectionLength, this.maxSelectionLength));
            
          return;
        }

        this.typo = selection;

        // Ctrl-Enter pressed
        this.setState({
          correctionMode: true
        });
      }
    });
  }

  render() {
    if (!this.state.correctionMode) return null;

    return (
      <TypoModal text={this.typo} closeCallback={this.modalClosedCallback} show={this.state.correctionMode}/>
    );
  }

  // This method is invoked when a modal has been closed
  modalClosedCallback = () => {
    this.setState({
      correctionMode: false
    })
  }

}

export default App;
