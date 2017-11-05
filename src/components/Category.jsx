import React, { Component } from 'react';
import { connect } from 'react-redux';
import orderBy from 'lodash/orderBy';
import find from 'lodash/find';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import Dialog from 'material-ui/Dialog';
import uuid from 'uuid/v1';
import SemanticForm from './SemanticForm';
import Post from './Post';
import { addPost, editPost, sortBy, deletePost } from '../actions';
import PropTypes from 'prop-types';

const {
  func, string, arrayOf, any,
} = PropTypes;

class Category extends Component {
  constructor() {
    super();
    this.mapping = new Map();
    this.mapping.set('1', 'timeStamp');
    this.mapping.set('2', 'voteScore');
  }
  state = {
    modalIsOpen: false,
    sortingOrder: 'timeStamp',
    dropdownOpen: false,
    selectedPost: null,
    isEdit: false,
  };

  componentWillReceiveProps() {
    this.setState({ modalIsOpen: false });
  }
  // onSubmit = (formData) => {
  //   const post = {
  //     id: uuid(),
  //     title: formData.title,
  //     body: formData.body,
  //     timeStamp: new Date().toString(),
  //     voteScore: 1,
  //     author: 'Stan Lee',
  //     comments: [],
  //     deleted: false,
  //     category: formData.category,
  //   };
  // };
  onAdd = (post) => {
    this.props.newPost(post);
  };
  onModalClose = (e) => {
    e.preventDefault();
    this.setState({ modalIsOpen: false });
  };
  onModalOpen = (e) => {
    e.preventDefault();
    const selectedPost = { title: '', body: '' };
    this.setState({ selectedPost, modalIsOpen: true, isEdit: false });
  };
  onDelete = (id) => {
    this.props.delete(id);
  };
  onEdit = (id) => {
    const selectedPost = find(this.props.data, { id });
    this.setState({ selectedPost, modalIsOpen: true, isEdit: true });
  }
  onEditSubmit = (post) => {
    this.setState({ modalIsOpen: false });
    this.props.updatePost(post);
  }
  displayArticles = () => {
    let { data: posts } = this.props;
    posts = orderBy(posts, [this.state.sortingOrder], ['desc']);
    return posts.map(post =>
      !post.deleted && (
      <li key={post.id} className="pb-2">
        <Post {...post} onDelete={this.onDelete} onEdit={this.onEdit} />
      </li>
      ));
  };
  handleChange = (sortIndex) => {
    const sortMethod = this.mapping.get(sortIndex);
    this.props.doSort(sortMethod);
    this.setState({ sortingOrder: sortMethod });
  };
  hasMatchedCategory = (c, category) =>
    c.toLowerCase() === category.toLowerCase();

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="post">
          <Dialog
            title="Create new post"
            modal={false}
            open={this.state.modalIsOpen}
            onRequestClose={this.onModalClose}
          >
            <SemanticForm
              category={this.props.category}
              categories={this.props.categories}
              onAdd={this.onAdd}
              onModalClose={this.onModalClose}
              post={this.state.selectedPost}
              isEdit={this.state.isEdit}
              onEditSubmit={this.onEditSubmit}
            />
          </Dialog>
          <div className="mt-3 container-fluid">
            <div className="row justify-content-start">
              <button
                className="btn btn-primary text-white"
                onClick={this.onModalOpen}
              >
                Add Post
              </button>
              <div>
                {this.props.data.length > 0 && (
                  <div style={{ display: 'flex' }}>
                    <span className="align-self-center ml-5">Sort by: </span>
                    <DropdownButton
                      onSelect={this.handleChange}
                      className="btn-outline-secondary ml-2"
                      title={this.state.sortingOrder}
                      id="bg-justified-dropdown"
                    >
                      <MenuItem eventKey="1">Last updated time</MenuItem>
                      <MenuItem eventKey="2">Vote score</MenuItem>
                    </DropdownButton>
                  </div>
                )}
              </div>
            </div>
          </div>
          <ul className="list-articles mt-3">{this.displayArticles()}</ul>
        </div>
      </div>
    );
  }
}

Category.propTypes = {
  newPost: func,
  doSort: func,
  delete: func,
  updatePost: func,
  category: string,
  categories: arrayOf(string),
  data: arrayOf(any),
};
Category.defaultProps = {
  newPost: f => f,
  doSort: f => f,
  delete: f => f,
  updatePost: f => f,
  category: 'home',
  categories: [],
  data: [],
};

function mapDispatchToActions(dispatch) {
  return {
    newPost(post) {
      dispatch(addPost(post));
    },
    updatePost(post) {
      dispatch(editPost(post));
    },
    doSort(sortMethod) {
      dispatch(sortBy(sortMethod));
    },
    delete(id) {
      dispatch(deletePost(id));
    },
  };
}

function mapStateToProps(state, ownProps) {
  return {
    data:
      ownProps.category === 'home'
        ? state.home
        : state.home.filter(post => post.category === ownProps.category),
  };
}

export default connect(mapStateToProps, mapDispatchToActions)(Category);
