import React from 'react';
import { Link } from 'react-router-dom';
import './Post.css';

const Post = ({ id, title, time, author, onEdit, onDelete }) => {
  return (
    <div>
      <div className="format-big">
        <h3>
          <Link to={{pathname: `/post/${id}`, state: null }}>
            {title}
          </Link>
        </h3>
        <span>
          <Link to={{pathname: `/post/${id}`, state: {isEdit: true} }}>Edit</Link>
        </span>
        <span>Delete</span>
      </div>

      <div className="format-small">
        <span>
          Submitted on {new Date(parseInt(id, 10)).toString()} by{' '}
          <em>{author}</em>
        </span>
      </div>
    </div>
  );
};

export default Post;
