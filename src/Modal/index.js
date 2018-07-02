import React, { Component } from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock, Alert } from 'react-bootstrap'

import $ from 'jquery';
import './Modal.css';

import { i18n } from '../Localization';
import { config } from '../config';

const alertify = require("alertify.js");

class TypoModal extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      show: this.props.show,
      text: this.props.text,
      correct: this.props.text,
      context: this.props.context,
      comment: "",
      error: ""
    }

    // TODO: English support
    i18n.setLanguage(config.language);

    this.closeCallback = props.closeCallback;

    // Bindings 
    this.submitTypo = this.submitTypo.bind(this);
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
    const serverUrl = config.serverUrl;
    const url = /*window.location.href*/ 
      "https://test.etersoft.ru/test_react_client";

    const data = {
      language: config.language,

      // Url of the page with a typo
      url: url,

      // Typo text
      text: this.state.text,

      // Corrected variant (legacy name "comment")
      comment: this.state.correct,

      // TODO: context
      context: this.state.context,

      // This is a comment for a correction
      note: this.state.comment,
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
      alertify.error(i18n.messageFailture);
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

      alertify.error(i18n.messageFailture);
    });
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

          {this.state.error ? <Alert bsStyle="danger">{this.state.error}</Alert> : null}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.handleClose}>{i18n.close}</Button>
          <Button onClick={this.submitTypo} bsStyle="primary">{i18n.saveChanges}</Button>
        </Modal.Footer>

      </Modal>
    );
  }
}

export default TypoModal;
