import React, { Component } from 'react';
import Modal from 'react-modal';
import uuid from 'uuid/v1';
import { ControlLabel, FormControl, FormGroup, HelpBlock, Button } from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>
        {label}
      </ControlLabel>
      <FormControl {...props} />
      {help &&
        <HelpBlock>
          {help}
        </HelpBlock>}
    </FormGroup>
  );
}

const customStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class ModalForm extends Component {
  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  };

  onSubmit = e => {
    e.preventDefault();
    let post = {
      id: uuid(),
      title: this.title.value,
      body: this.body.value,
      timestamp: new Date().toString(),
      voteScore: 1,
      author: 'Stan Lee',
      comments: [],
      deleted: false,
      category: this.category.value
    };
    this.props.onAdd(post);
  };
  render() {
    const { modalIsOpen, onModalClose } = this.props;
    return (
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={onModalClose}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="post-form">
            <h2 ref={subtitle => (this.subtitle = subtitle)}>New Post</h2>
            <form onSubmit={this.onSubmit}>
              <FieldGroup
                id="formControlsText"
                type="text"
                label="Title"
                placeholder="Enter title"
                inputRef={ref => {
                  this.title = ref;
                }}
              />
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Textarea</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  placeholder="Enter body"
                  inputRef={ref => {
                    this.body = ref;
                  }}
                />
              </FormGroup>
              <ControlLabel>Category</ControlLabel>
              <FormControl
                componentClass="select"
                inputRef={ref => {
                  this.category = ref;
                }}
                placeholder="select"
              >
                <option value="select">select</option>
                <option value="React">React</option>
                <option value="Udacity">Udacity</option>
              </FormControl>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginTop: '0.5em'
                }}
              >
                <Button type="submit" bsStyle="primary">
                  Create
                </Button>
                <Button onClick={this.closeModal} style={{ marginLeft: '0.30em' }} bsStyle="primary">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ModalForm;
