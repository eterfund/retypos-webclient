import React, { Component } from 'react';

import {Modal, Checkbox, Button, FormGroup, FormControl, ControlLabel, HelpBlock, Alert } from 'react-bootstrap';

import $ from 'jquery';
import './Modal.css';

import { i18n } from '../Localization';
import { config } from '../config';

import LangSwitcher from '../LangSwitcher';

const alertify = require("alertify.js");

class TypoModal extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      show: this.props.show,
      text: this.props.text,
      correct: this.props.text,
      context: this.props.context,
      contentEditable: this.props.contentEditable,
      language: this.getLanguage(),
      comment: "",
      error: ""
    }

    this.languages = [ "ru", "en" ];

    i18n.setLanguage(this.state.language);

    this.closeCallback = props.closeCallback;
    this.contentEditableCallback = props.contentEditableCallback;

    // Bindings 
    this.submitTypo = this.submitTypo.bind(this);

    if (!window.localStorage.getItem(`${config.appStorageKey}.debug`)) {
      window.localStorage.setItem(`${config.appStorageKey}.debug`, false);
    }

  }

  handleShow = () => {
    this.setState({ show: true })
  }

  handleClose = () => {
    this.setState({
      show: false,
      text: this.props.text,
      comment: ""
    });

    this.closeCallback();
  }

  // Comment data binding
  onChangeComment = (event) => {
    this.setState({ comment: event.target.value });
  }

  // Correct data binding
  onChangeCorrect = (event) => {
    this.setState({ correct: event.target.value });
  }

  // Validate input data
  checkData = () => {

    if (this.state.text === this.state.correct) {
      this.setState({ error: i18n.errorDoesNotDistinct });
      return false;
    }

    if (this.state.correct.length > config.maxCorrectLength ||
      this.state.correct.length < config.minCorrectLength) {
      this.setState({
        error: i18n.formatString(i18n.errorCorrectLength,
          config.minCorrectLength,
          config.maxCorrectLength)
      });
      return false;
    }

    return true;
  }

  // Send data to the server 
  async sendRequest() {
    let debugMode = window.localStorage.getItem(`${config.appStorageKey}.debug`);
    
    let serverUrl = config.serverUrl;
    if (debugMode == "true") {
      serverUrl = config.devServerUrl;
    }

    const url = window.location.href;

    const data = {
      language: this.state.language,

      // Url of the page with a typo
      url: url,

      // Typo text
      text: this.state.text,

      // This is a comment for a correction
      comment: this.state.comment,

      // TODO: context
      context: this.state.context,

      // This is a correct variant
      corrected: this.state.correct,
    }

    try {
      let result = await $.ajax({
        method: "POST",
        data: data,
        url: serverUrl,
      });

      result = JSON.parse(result);

      if (result.success === "true") {
        return true;
      }

      console.error("sendRequest error:", result.message);
      return false;
    } catch (error) {
      return false;
    }
  }

  // Validate data and send request to the server
  async submitTypo(corrected, comment) {

    if (!this.checkData()) {
      alertify.error(i18n.errorFormContainsErrors);
      return;
    }

    // Close window - user can continue working 
    this.handleClose();

    // Send async request
    this.sendRequest().then(success => {
      if (success) {
        alertify.success(i18n.messageSuccess);
        return;
      }

      alertify.error(i18n.errorSendFailture);
    });
  }

  // Returns language from local storage preferences or from default config value
  getLanguage() {
    const persisted = window.localStorage.getItem(`${config.appStorageKey}.lang`);
    return persisted || config.defaultLanguage;
  }

  // Save language user preference to the local storage
  persistLanguage(lang) {
    window.localStorage.setItem(`${config.appStorageKey}.lang`, lang);
  }

  onLangChanged = language => {
    i18n.setLanguage(language);
    this.setState({language: language});
    
    this.persistLanguage(language);
  }

  onContentEditableCheckboxChanged = (e) => {
    this.setState({
      contentEditable: e.target.checked
    });

    this.contentEditableCallback(e);
  }

  render() {
    if (!this.state.show) return null;

    return (
      <Modal className="es-typo-window" show={this.state.show} onHide={this.handleClose}>

        <Modal.Header closeButton><Modal.Title>{i18n.modalTitle}</Modal.Title></Modal.Header>

        <Modal.Body>
          <p>{i18n.modalInfo}</p>

          <form onSubmit={this.submitTypo}>
            <FormGroup className="es-typo-text-fg">
              <ControlLabel>{i18n.modalTypoLabel}</ControlLabel>
              <p className="es-typo-text">{this.state.text}</p>
            </FormGroup>

            <FormGroup className="es-typo-correct-fg">
              <ControlLabel>{i18n.modalCorrectLabel}</ControlLabel>
              <FormControl
                type="text"
                defaultValue={this.state.correct}
                onChange={this.onChangeCorrect}
                required />
              <HelpBlock>{i18n.modalCorrectHelp}</HelpBlock>

              <ControlLabel>{i18n.modalCommentLabel}</ControlLabel>
              <FormControl
                type="text"
                placeholder={i18n.modalCommentPlaceholder}
                onChange={this.onChangeComment} />
            </FormGroup>
          </form>

          {this.state.error && <Alert bsStyle="danger">{this.state.error}</Alert>}
        </Modal.Body>

        <Modal.Footer>
          <Checkbox onChange={this.onContentEditableCheckboxChanged} checked={this.state.contentEditable}>
            {i18n.typoHighlightingEnable}
          </Checkbox>
          <LangSwitcher activeLanguage={this.state.language} onLangChanged={this.onLangChanged} languages={this.languages}></LangSwitcher>

          <Button onClick={this.handleClose}>{i18n.close}</Button>
          <Button onClick={this.submitTypo} bsStyle="primary">{i18n.saveChanges}</Button>
        </Modal.Footer>

      </Modal>
    );
  }
}

export default TypoModal;
