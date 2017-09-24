import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BackIcon from 'react-icons/lib/md/arrow-back';
import authorImage from '../icons/author.png';
import user1Image from '../icons/user1.jpg';
import user2Image from '../icons/user2.png';
import user3Image from '../icons/user3.png';
import user4Image from '../icons/user4.png';
import user5Image from '../icons/user5.png';
import user6Image from '../icons/user6.png';
import { addComment, editPost } from '../actions';
import Comment from './Comment';
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
    isEdit: false
  };
  addComment = () => {
    const parentId = this.props.match.params.id;
    const comment = {};
    comment.text = this.textInput.value;
    comment.timestamp = Date.now();
    let randomId = Math.floor(Math.random() * 6 + 1);
    let randomUser = this.state.users[randomId];
    comment.id = new Date().getTime().toString();
    comment.author = randomUser.name;
    comment.avatar = randomUser.avatar;
    comment.parentId = parentId;
    comment.parentDeleted = false;
    comment.voteScore = 0;
    comment.deleted = false;
    this.props.pushComment(comment);
    this.textInput.value = '';
  };

  onEdit = postId => {
    const body = this.refs.textInput.value;
    this.setState({ isEdit: false });
    this.props.updatePost(postId, body);
  };

  displayComments = (comments, updateComment) => {
    if (comments.length === 0) {
      return null;
    }
    return comments.map((comment, index) => {
      return (
        <li className="comment" key={comment.id}>
          <Comment {...comment} />
        </li>
      );
    });
  };

  render() {
    const { title, author, body, comments, updateComment } = this.props;
    const postId = this.props.match.params.id;
    return (
      <div>
        <div>
          <Link to="/">
            <BackIcon size={40} />
          </Link>
        </div>
        <div className="container">
          <article className="post">
            <h1>
              {title}
              <span>
                <Link to={{ pathname: `/post/${postId}`, state: { isEdit: true } }}>Edit</Link>
              </span>
            </h1>
            <p className="posted-by">
              Posted by {author}
            </p>
            {!this.props.location.state && body}
            {this.props.location.state &&
              <div className="edit-post">
                <div className="first-box">
                  <textarea name="comment" ref="textInput" autoFocus defaultValue={body} />
                </div>
                <div className="second-box">
                  <span>
                    <Link onClick={() => this.onEdit(postId)} to={{ pathname: `/post/${postId}`, state: null }}>
                      Save
                    </Link>
                  </span>
                  <span>
                    <Link to={{ pathname: `/post/${postId}`, state: null }}>Cancel</Link>
                  </span>
                </div>
              </div>}
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
    title: state.home[ownProps.match.params.id].title,
    author: state.home[ownProps.match.params.id].author,
    body: state.home[ownProps.match.params.id].body,
    comments: state.home[ownProps.match.params.id].comments
  };
}

function mapDispatchToActions(dispatch) {
  return {
    pushComment(comment) {
      dispatch(addComment(comment));
    },
    updatePost(postId, body) {
      dispatch(editPost(postId, body));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToActions)(DetailedPage);
