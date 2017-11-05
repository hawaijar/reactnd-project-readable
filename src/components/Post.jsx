import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditIcon from 'react-icons/lib/fa/edit';
import TrashIcon from 'react-icons/lib/fa/trash';
import { deletePost } from '../actions';
import './Post.css';

const { string, func, number } = PropTypes;

class Post extends Component {
  state = {};
  onDelete = (id) => {
    this.props.removePost(id);
  };

  render() {
    const {
      id, timeStamp, title, author, voteScore,
    } = this.props;
    return (
      <div>
        <div className="container-fluid">
          <div className="row justify-content-start">
            <h3>
              <Link
                className="text-muted"
                to={{ pathname: `/post/${id}`, state: null }}
              >
                {title}
              </Link>
            </h3>
            <div className="ml-4" aria-label="Edit Delete">
              <a href="#" className="">
                <EditIcon />
              </a>
              <a href="#" className="pl-2">
                <TrashIcon onClick={e => this.onDelete(id)} />
              </a>
              <span className="ml-3 badge badge-pill badge-secondary">
                {`${voteScore} pts.`}
              </span>
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
  voteScore: number,
  onDelete: func,
};
Post.defaultProps = {
  removePost: f => f,
  onDelete: f => f,
  id: '',
  timeStamp: 0,
  title: '',
  author: '',
  voteScore: 0,
};

function mapDispatchToActions(dispatch) {
  return {
    removePost(postId) {
      dispatch(deletePost(postId));
    },
  };
}

export default connect(null, mapDispatchToActions)(Post);
