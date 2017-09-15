import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BackIcon from 'react-icons/lib/md/arrow-back';
import moment from 'moment';
import authorImage from './author.png';
import user1Image from './user1.jpg';
import user2Image from './user2.png';
import user3Image from './user3.png';
import user4Image from './user4.png';
import user5Image from './user5.png';
import user6Image from './user6.png';
import { addComment } from '../actions';
import { editComment } from '../actions';
import '../App.css';
import './DetailedPage.css';

class DetailedPage extends Component {
  state = {
    comments: [],
    users: {
      1: {
        name: 'Shelley',
        avatar: user1Image
      },
      2: {
        name: 'Marc',
        avatar: user2Image
      },
      3: {
        name: 'Mike',
        avatar: user3Image
      },
      4: {
        name: 'Kyle',
        avatar: user4Image
      },
      5: {
        name: 'Bob',
        avatar: user5Image
      },
      6: {
        name: 'Jane',
        avatar: user6Image
      }
    },
    isEdit: false,
    temp: ''
  };
  onEdit = () => {
      this.setState({
      isEdit: true
    })
  };
  onCancel = () => {
      this.setState({
      isEdit: false
    })
  };
  onSave = comment => {
    comment.text = this.refs.textInput.value;
    this.refs.textInput.value = '';
    this.props.updateComment(comment.postId, comment);
    this.setState({
      isEdit: false
    })
  };
  displayComments = (comments, updateComment) => {
    if (comments.length === 0) {
      return null;
    }

    return comments.map((comment, index) => {
      return (
        <li className="comment" key={index}>
          <div className="comment-box">
            <div className="info-avatar">
              <a className="avatar" href="">
                <img
                  src={comment.avatar}
                  width="35"
                  alt="Profile Avatar"
                  title={comment.name}
                />
              </a>

              <div className="info">
                <a href="">{comment.author}</a>
                <a href="" className="delete">
                  Delete
                </a>
                <span
                  className="edit"
                  onClick={this.onEdit}
                  style={{
                    color: 'blue',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                >
                  Edit
                </span>
                <span>{moment(comment.timestamp).fromNow()}</span>
              </div>
            </div>
            <div style={{ marginTop: '0.6em', lineHeight: '1.5em' }}>
              {!this.state.isEdit && comment.text}
              { this.state.isEdit &&  <div className="edit-box">
                  <div className="first-box">
                    <textarea
                      placeholder="Add your comment here"
                      name="comment"
                      ref="textInput"
                      autoFocus
                      defaultValue = {comment.text}
                    />
                  </div>
                  <div className="second-box">
                    <button onClick={() => this.onSave(comment)}>Save</button>
                    <button onClick={this.onCancel}>Cancel</button>
                  </div>
                </div>
              }
            </div>
          </div>

        </li>
      );
    });
  };

  addComment = () => {
    const postId = this.props.match.params.id;
    const comment = {};
    comment.text = this.textInput.value;
    comment.timestamp = Date.now();
    let randomId = Math.floor(Math.random() * 6 + 1);
    let randomUser = this.state.users[randomId];
    comment.id = new Date().getTime().toString();
    comment.author = randomUser.name;
    comment.avatar = randomUser.avatar;
    comment.postId = postId;
    this.props.pushComment(postId, comment);
    this.textInput.value = '';
  };

  render() {
    const { title, author, body } = this.props.post;

    const { comments, updateComment } = this.props;
    return (
      <div>
        <div>
          <Link to="/">
            <BackIcon size={40} />
          </Link>
        </div>
        <div className="container">
          <article className="post">
            <h1>{title}</h1>
            <p className="posted-by">Posted by {author}</p>
            {body}
          </article>
          <hr />
          <section className="commentContainer">
            <span
              style={{
                marginBottom: '.35em',
                fontSize: '1em',
                color: '#666'
              }}
            >
              Comments
            </span>
            <section className="display-comment">
              <ul className="comment-section">
                {this.displayComments(comments, updateComment)}
              </ul>
            </section>
            <section className="addComment">
              <div className="avatar">
                <img src={authorImage} alt="avatar" />
              </div>
              <div className="comment">
                <textarea
                  placeholder="Add your comment here"
                  name="comment"
                  ref={input => {
                    this.textInput = input;
                  }}
                />
                <div>
                  <button onClick={this.addComment}>Publish</button>
                </div>
              </div>
            </section>
          </section>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.home[ownProps.match.params.id],
    comments: state.home[ownProps.match.params.id].comments
  };
}

function mapDispatchToActions(dispatch) {
  return {
    pushComment(postId, comment) {
      dispatch(addComment(postId, comment));
    },
    updateComment(postId, comment) {
      dispatch(editComment(postId, comment));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToActions)(DetailedPage);
