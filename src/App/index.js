import React, { Component } from 'react';
import $ from 'jquery';

import TypoModal from '../Modal/';
import ContextExtractor from './ContextExtractor';
import {i18n} from '../Localization';

import {config} from '../config';

const alertify = require("alertify.js");

class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      correctionMode: false,
      isTimeout: false,
    }

    this.selectionContext = "";
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
        if (this.state.isTimeout) {
          alertify.error(i18n.errorTooOften);
          return;
        }
        
        const contextExtractor = new ContextExtractor();
        const selection = this.getSelectedText();
        this.selectionContext = contextExtractor.getContextForSelection();

        if (selection === "") {
          return;
        }

        if (selection.length < config.minTypoLength || 
          selection.length > config.maxTypoLength) 
        {
          alertify.error(i18n.formatString(i18n.errorSelectionLength, 
            config.minTypoLength, config.maxTypoLength));
            
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
      <TypoModal text={this.typo} context={this.selectionContext}
        closeCallback={this.modalClosedCallback.bind(true)} 
        show={this.state.correctionMode}/>
    );
  }

  // This method is invoked when a modal has been closed
  modalClosedCallback = (requestSent) => {
    if (!requestSent) {
      this.setState({
        correctionMode: false
      });
      return;
    }

    this.setState({
      correctionMode: false,
      isTimeout: true,
    });

    window.setTimeout(() => { 
      this.setState({ isTimeout: false }); 
    }, config.requestTimeout);
  }

}

export default App;
