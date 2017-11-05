import React, { Component } from 'react';
import { connect } from 'react-redux';
import VoteUpIcon from 'react-icons/lib/md/arrow-drop-up';
import VoteDownIcon from 'react-icons/lib/md/arrow-drop-down';
import moment from 'moment';
import { editComment, deleteComment } from '../actions';

class Comment extends Component {
  state = {
    isEdit: false,
  };
  onDelete = (comment) => {
    comment.deleted = true;
    this.props.removeComment(comment);
  };
  onEdit = () => {
    this.setState({
      isEdit: true,
    });
  };
  onCancel = () => {
    this.setState({
      isEdit: false,
    });
  };
  onSave = (comment) => {
    comment.text = this.refs.textInput.value;
    this.refs.textInput.value = '';
    this.props.updateComment(comment);
    this.setState({
      isEdit: false,
    });
  };
  onVoteScoreUp = (comment) => {
    comment.voteScore += 1;
    this.props.updateComment(comment);
  };
  onVoteScoreDown = (comment) => {
    comment.voteScore -= 1;
    this.props.updateComment(comment);
  };

  render() {
    const comment = { ...this.props };
    return (
      <div className="comment-box">
        <div className="info-avatar">
          <a className="avatar" href="#0">
            <img
              src={comment.avatar}
              width="35"
              alt="Profile Avatar"
              title={comment.name}
            />
          </a>
          <div className="info">
            <a href="#0">{comment.author}</a>
            <span
              className="delete"
              onClick={() => this.onDelete(comment)}
              style={{
                color: 'blue',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Delete
            </span>
            <span
              className="edit"
              onClick={this.onEdit}
              style={{
                color: 'blue',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Edit
            </span>
            <span>{moment(comment.timestamp).fromNow()}</span>
          </div>
        </div>
        <div style={{ marginTop: '0.6em', lineHeight: '1.5em' }}>
          {!this.state.isEdit && (
            <div className="comment-vote">
              <span>{comment.body}</span>
              <div>
                <VoteUpIcon
                  onClick={() => this.onVoteScoreUp(comment)}
                  width={50}
                  height={50}
                />
                <span>{`(${comment.voteScore})`}</span>
                <VoteDownIcon
                  onClick={() => this.onVoteScoreDown(comment)}
                  width={50}
                  height={50}
                />
              </div>
            </div>
          )}
          {this.state.isEdit && (
            <div className="edit-box">
              <div className="first-box">
                <textarea
                  placeholder="Add your comment here"
                  name="comment"
                  ref="textInput"
                  autoFocus
                  defaultValue={comment.text}
                />
              </div>
              <div className="second-box">
                <button onClick={() => this.onSave(comment)}>Save</button>
                <button onClick={this.onCancel}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
function mapDispatchToActions(dispatch) {
  return {
    updateComment(comment) {
      dispatch(editComment(comment));
    },
    removeComment(comment) {
      dispatch(deleteComment(comment));
    },
  };
}
export default connect(null, mapDispatchToActions)(Comment);
