import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EditIcon from 'react-icons/lib/fa/edit';
import TrashIcon from 'react-icons/lib/fa/trash';
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
        id, timestamp, title, author, voteScore,
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
                  <TrashIcon />
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
            Submitted on {new Date(parseInt(timestamp, 10)).toString()} by <em>{author}</em>
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
