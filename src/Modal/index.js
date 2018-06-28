import React, { Component } from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'
import './Modal.css';

import {i18n} from '../Localization'

class TypoModal extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      show: this.props.show
    }

    this.text = props.text;
    this.closeCallback = props.closeCallback;
  }

  handleShow = () => {
    this.setState({ show: true })
  }

  handleClose = () => {
    this.setState({ show: false })
    this.closeCallback();
  }

  render() {
    if (!this.state.show) return null;

    return (
      <Modal className="es-typo-window" show={this.state.show} onHide={this.handleClose}>

        <Modal.Header closeButton><Modal.Title>{i18n.modalTitle}</Modal.Title></Modal.Header>

        <Modal.Body>
          <p>{i18n.modalInfo}</p>

          <form>
            <FormGroup className="es-typo-text-fg">
              <ControlLabel>{i18n.modalTypoLabel}</ControlLabel>
              <p className="es-typo-text">{this.text}</p>
            </FormGroup>

            <FormGroup className="es-typo-correct-fg">
              <ControlLabel>{i18n.modalCorrectLabel}</ControlLabel>
              <FormControl 
                type="text"
                value={this.text} /> 
              <HelpBlock>{i18n.modalCorrectHelp}</HelpBlock>
            </FormGroup>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button>{i18n.close}</Button>
          <Button bsStyle="primary">{i18n.saveChanges}</Button>
        </Modal.Footer>
      
      </Modal>
    );
  }
}

export default TypoModal;
