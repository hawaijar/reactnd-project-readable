import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editPost } from '../actions';
import EditIcon from 'react-icons/lib/fa/edit';
import TrashIcon from 'react-icons/lib/fa/trash';
import UpVoteIcon from 'react-icons/lib/md/thumb-up';
import DownVoteIcon from 'react-icons/lib/md/thumb-down';
import { deletePost } from '../actions';
import './Post.css';

const {
  string, func, number, array, any,
} = PropTypes;

class Post extends Component {
  state = {};
  onDelete = (id) => {
    this.props.removePost(id);
  };
  upVote = () => {
    const { post } = this.props;
    post.voteScore += 1;
    this.props.updatePost(post);
  };
  downVote = () => {
    const { post } = this.props;
    post.voteScore -= 1;
    this.props.updatePost(post);
  };

  render() {
    const {
      id,
      timeStamp,
      title,
      author,
      voteScore,
      onEdit,
      comments,
      category,
    } = this.props;
    return (
      <div>
        <div className="container-fluid">
          <div className="row justify-content-start">
            <h3>
              <Link
                className="text-muted"
                to={{ pathname: `/${category}/${id}`, state: null }}
              >
                {title}
              </Link>
            </h3>
            <div className="ml-4" aria-label="Edit Delete">
              <a href="#0" className="" onClick={() => onEdit(id)}>
                <EditIcon />
              </a>
              <a href="#0" className="pl-2">
                <TrashIcon onClick={e => this.onDelete(id)} />
              </a>
              <span className="ml-3 badge badge-pill badge-info">
                {`${voteScore} pts.`}
              </span>
              <span
                style={{ marginRight: '1em' }}
                className="ml-3 badge badge-pill badge-info"
              >
                {`${comments.length} comments`}
              </span>
              <UpVoteIcon
                size={18}
                style={{ cursor: 'pointer' }}
                onClick={this.upVote}
              />
              <div
                style={{
                  display: 'inline-flex',
                  margin: '0 -0.2em',
                  flexDirection: 'column',
                  textAlign: 'center',
                }}
              >
                <div>{`${voteScore}`}</div>
                <div style={{ marginTop: '-5px' }}>votes</div>
              </div>
              <DownVoteIcon
                size={18}
                style={{ cursor: 'pointer' }}
                onClick={this.downVote}
              />
            </div>
          </div>

          {/* <span>
              <Link to={{ pathname: `/post/${id}`, state: { isEdit: true } }}>Edit</Link>
            </span>
            <span onClick={() => this.onDelete(id)}>Delete</span>
            <span className="badge badge-pill badge-secondary">
              {`[${voteScore} point(s)]`}
            </span> */}
        </div>

        <div className="text-muted mt-2 small">
          <span>
            Submitted on {new Date(parseInt(timeStamp, 10)).toString()} by{' '}
            <em>{author}</em>
          </span>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  removePost: func,
  id: string,
  timeStamp: number,
  title: string,
  author: string,
  comments: array,
  voteScore: number,
  onDelete: func,
  onEdit: func,
  post: any,
  updatePost: func,
};
Post.defaultProps = {
  removePost: f => f,
  onDelete: f => f,
  onEdit: f => f,
  id: '',
  timeStamp: 0,
  title: '',
  author: '',
  voteScore: 0,
  comments: [],
  post: null,
  updatePost: f => f,
};

function mapDispatchToActions(dispatch) {
  return {
    removePost(postId) {
      dispatch(deletePost(postId));
    },
    updatePost(post) {
      dispatch(editPost(post));
    },
  };
}

export default connect(null, mapDispatchToActions)(Post);
