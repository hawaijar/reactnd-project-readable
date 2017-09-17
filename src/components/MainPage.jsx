import React, { Component } from 'react';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import uuid from 'uuid/v1';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import HomeCategory from './Home';
import Category from './Category';
import { addPost } from '../actions';
import {
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
  Button
} from 'react-bootstrap';
import './MainPage.css';

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

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class MainPage extends Component {
  state = {
    modalIsOpen: false
  };
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  onOpen = e => {
    e.preventDefault();
  };

  onSubmit = (e) => {
    e.preventDefault();
    let post = {
      id: uuid(),
      title: this.title.value,
      body: this.body.value,
      timestamp: new Date().toString(),
      score: 1,
      author: 'Stan Lee',
      comments: [],
      deleted: false,
      category: this.category.value
    }
    this.props.newPost(post);
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div className="main">
        <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
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
                  inputRef={ref => {this.title=ref}}
                />
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Textarea</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    placeholder="Enter body"
                    inputRef={ref => {this.body=ref}}
                  />
                </FormGroup>
                <ControlLabel>Category</ControlLabel>
                <FormControl
                  componentClass="select"
                  inputRef={ref => {this.category=ref}}
                  placeholder="select">
                  <option value="select">select</option>
                  <option value="React">React</option>
                  <option value="Udacity">Udacity</option>
                </FormControl>
                <div
                style={
                  {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    marginTop: "0.5em"
                  }
                }>
                  <Button
                    type="submit"
                    bsStyle="primary">
                    Create
                  </Button>
                  <Button
                    onClick={this.closeModal}
                    style={{marginLeft: "0.30em"}}
                    bsStyle="primary">
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Home">
            <HomeCategory />
          </Tab>
          <Tab eventKey={2} title="React">
            <Category category="React" />
          </Tab>
          <Tab eventKey={3} title="Udacity">
            <Category category="Udacity" />
          </Tab>
        </Tabs>
        <div onClick={this.openModal} className="open-search">
          <a onClick={this.onOpen} href="/">
            New
          </a>
        </div>
      </div>
    );
  }
}
function mapDispatchToActions(dispatch) {
  return {
    newPost(post) {
      dispatch(addPost(post));
    }
  };
}
export default connect(null, mapDispatchToActions)(MainPage);
