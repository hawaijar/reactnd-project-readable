import React, { Component } from 'react';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import { connect } from 'react-redux';
import Category from './Category';
import { addPost } from '../actions';

import './MainPage.css';

function toCapitalize(str) {
  if (typeof str === 'string') {
    const lowercase = str.toLowerCase();
    return `${lowercase.charAt(0).toUpperCase()}${str.slice(1)}`;
  }
  return null;
}

class MainPage extends Component {
  state = {
    modalIsOpen: false,
    categories: ['react', 'redux', 'udacity']
  };

  render() {
    return (
      <div className="main">
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Home">
            <Category category="Home" />
          </Tab>
          <Tab eventKey={2} title="React">
            <Category category="React" />
          </Tab>
          <Tab eventKey={3} title="Udacity">
            <Category category="Udacity" />
          </Tab>
        </Tabs>
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
