import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost } from '../actions';
import './Post.css';

class Post extends Component {
  onDelete = (id) => {
    this.props.removePost(id);
  }
  render() {
    const { id, title, author } = this.props;
    return (
      <div>
        <div className="format-big">
          <h3>
            <Link to={{ pathname: `/post/${id}`, state: null }}>{title}</Link>
          </h3>
          <span>
            <Link to={{ pathname: `/post/${id}`, state: { isEdit: true } }}>
              Edit
            </Link>
          </span>
          <span onClick={() => this.onDelete(id)}>Delete</span>
        </div>

        <div className="format-small">
          <span>
            Submitted on {new Date(parseInt(id, 10)).toString()} by{' '}
            <em>{author}</em>
          </span>
        </div>
      </div>
    );
  }
}
function mapDispatchToActions(dispatch) {
  return {
    removePost(postId) {
      dispatch(deletePost(postId));
    }
  };
}

export default connect(null, mapDispatchToActions)(Post);
