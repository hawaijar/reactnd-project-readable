import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost } from '../actions';
import './Post.css';

class Post extends Component {
  onDelete = id => {
    this.props.removePost(id);
  };

  render() {
    const { id, timeStamp, title, author, voteScore, sortBy = 'voteScore', onSortOrderChange } = this.props;
    return (
      <div>
        <div className="format-big">
          <h3>
            <Link to={{ pathname: `/post/${id}`, state: null }}>
              {title}
            </Link>
          </h3>
          <span>
            <Link to={{ pathname: `/post/${id}`, state: { isEdit: true } }}>Edit</Link>
          </span>
          <span onClick={() => this.onDelete(id)}>Delete</span>
          <p style={{ display: 'inline-block', margin: '0 1.5em 1em', fontSize: '0.85em' }}>
            Sort by:
            <span onClick={() => onSortOrderChange('score')}>Vote score</span>
            <span onClick={() => onSortOrderChange('time')}>Last updated time</span>
          </p>
          <span style={{ color: 'initial', cursor: 'initial' }}>
            {sortBy === 'voteScore' ? `[${voteScore} point(s)]` : ''}
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
    }
  };
}

export default connect(null, mapDispatchToActions)(Post);
