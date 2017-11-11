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
  onHandleChange = (index) => {
    if (index >= 2) {
      const selectedCategory = this.state.categories[index - 2];
      this.props.history.push(`/${selectedCategory}`);
    } else {
      this.props.history.push('/');
    }
  };
  createTabs = (startIndex = 1) => {
    const { categories } = this.state;
    const keys = categories.map((category, index) => startIndex + index + 1);
    return keys.map((key) => {
      const title = toCapitalize(categories[key - 2]);
      const category = categories[key - 2];
      return (
        <Tab eventKey={key} key={category} title={title}>
          <Category category={category} categories={this.state.categories} />
        </Tab>
      );
    });
  };
  render() {
    const activeCategory = this.props.match.params.category;
    const index = this.state.categories.indexOf(activeCategory);
    let activeKey;
    if (activeCategory && index !== -1) {
      activeKey = this.state.categories.indexOf(activeCategory) + 2;
    } else if (this.props.location.pathname !== '/') {
      return (
        <div>
          <h3>404 page not found</h3>
          <p>We are sorry but the page you are looking for does not exist.</p>
        </div>
      );
    }

    return (
      <div className="main">
        <FadeLoader color="#888" loading={this.state.loading} />
        <Tabs
          onSelect={this.onHandleChange}
          defaultActiveKey={activeKey || 1}
          id="uncontrolled-tab-example"
        >
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
