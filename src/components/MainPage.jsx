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

  createTabs = (startIndex = 1) => {
    const categories = this.state.categories;
    const keys = categories.map((category, index) => startIndex + index + 1);
    const tabs = keys.map(key => {
      const title = toCapitalize(categories[key - 2]);
      const category = categories[key - 2];
      return (
        <Tab eventKey={key} key={category} title={title}>
          <Category category={category} />
        </Tab>
      );
    });
    return tabs;
  };

  render() {
    return (
      <div className="main">
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Home">
            <Category category="home" />
          </Tab>
          {this.createTabs()}
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
