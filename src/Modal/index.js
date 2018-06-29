import React, { Component } from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'
import './Modal.css';

import {i18n} from '../Localization'

class TypoModal extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      show: this.props.show,
      text: this.props.text,
      correct: this.props.text,
      comment: ""
    }

    this.closeCallback = props.closeCallback;
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

  // Send typo to the typos server
  submitTypo = (corrected, comment) => {
    alert(`Submit typo ${this.state.text}->${this.state.correct} (${this.state.comment})`);
    this.handleClose();
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
                onChange={this.onChangeComment}/> 
            </FormGroup>
          </form>
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
