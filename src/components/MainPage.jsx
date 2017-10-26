import React, { Component } from 'react';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import { connect } from 'react-redux';
import map from 'lodash/map';
import { FadeLoader } from 'react-spinners';
import Category from './Category';
import { addPost } from '../actions';
import getAllCategories from './Fetch';
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
    categories: ['react', 'redux', 'udacity'],
    loading: false,
  };
  componentWillMount() {
    this.setState({ loading: true });
  }
  componentDidMount() {
    let categories;
    getAllCategories()
      .then((res) => {
        categories = map(res.categories, 'name');
        this.setState({ categories, loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  createTabs = (startIndex = 1) => {
    const { categories } = this.state;
    const keys = categories.map((category, index) => startIndex + index + 1);
    return keys.map((key) => {
      const title = toCapitalize(categories[key - 2]);
      const category = categories[key - 2];
      return (
        <Tab eventKey={key} key={category} title={title}>
          <Category category={category} categories={this.state.categories}/>
        </Tab>
      );
    });
  };
  render() {
    return (
      <div className="main">
        <FadeLoader color="#888" loading={this.state.loading} />
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Home">
            <Category category="home" categories={this.state.categories} />
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
    },
  };
}
export default connect(null, mapDispatchToActions)(MainPage);
