import React, { Component } from 'react';
import $ from 'jquery';

import TypoModal from '../Modal/';
import ContextExtractor from './ContextExtractor';
import {i18n} from '../Localization';

import {config} from '../config';

import './styles.scss';

const alertify = require("alertify.js");

class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      correctionMode: false,
      isTimeout: false,
      contentEditable: false
    }

    this.selectionContext = "";
    this.typo = "";
    this.registerHandlers();
  }

  setContenteditable = (e) => {
    if (e.target.checked) {
      this.setState({
        contentEditable: true
      });

      alertify.success(i18n.typoHighlightingEnabled);
    } else {
      this.setState({
        contentEditable: false
      });

      alertify.success(i18n.typoHighlightingDisabled);
    }
  }

  /**
   * Enables browser typo highlighting on page
   */
  enableTypoHighlighting = () => {
    let body = $("body");
    body.attr("contenteditable", true);
    body.attr("oncut", "return false");
    body.attr("onpaste", "return false");
    body.attr("onkeydown", "if(event.metaKey) return true; return false;");
  }

  /**
  * Disables browser typo highlighting on page
  */
  disableTypoHighlighting = () => {
    let body = $("body");
    body.attr("contenteditable", false);
    body.attr("oncut", "return true");
    body.attr("onpaste", "return true");
    body.attr("onkeydown", "return true");
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

        this.disableTypoHighlighting();

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
        contentEditableCallback={this.setContenteditable}
        contentEditable={this.state.contentEditable}
        show={this.state.correctionMode}/>
    );
  }

  // This method is invoked when a modal has been closed
  modalClosedCallback = (requestSent) => {
    if (!requestSent) {
      this.setState({
        correctionMode: false
      });
    } else {

      this.setState({
        correctionMode: false,
        isTimeout: true,
      });

      this.requestTimer = window.setTimeout(() => { 
        this.setState({ isTimeout: false }); 
      }, config.requestTimeout);
    }

    if (this.state.contentEditable) {
      this.enableTypoHighlighting();
    }

  }

  componentWillUnmount() {
    window.clearTimeout(this.requestTimeout);
  }
}

export default App;
