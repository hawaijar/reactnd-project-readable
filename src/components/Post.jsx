import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost } from '../actions';
import './Post.css';

class Post extends Component {
    onDelete = (id) => {
      this.props.removePost(id);
    };

    state = {
      sortValue: 'timeStamp',
    };

    render() {
      const {
        id, timeStamp, title, author, voteScore,
      } = this.props;
      return (
        <div>
          <div className="format-big">
            <h3>
              <Link className="text-muted" to={{ pathname: `/post/${id}`, state: null }}>
                {title}
              </Link>
            </h3>
            <span>
              <Link to={{ pathname: `/post/${id}`, state: { isEdit: true } }}>Edit</Link>
            </span>
            <span onClick={() => this.onDelete(id)}>Delete</span>
            <span style={{ color: 'initial', cursor: 'initial' }}>
              {`[${voteScore} point(s)]`}
            </span>
          </div>

          <div className="format-small">
            <span>
            Submitted on {new Date(parseInt(timeStamp, 10)).toString()} by <em>{author}</em>
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
    },
  };
}

export default connect(null, mapDispatchToActions)(Post);
