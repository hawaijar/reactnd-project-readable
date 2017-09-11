import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import BackIcon from "react-icons/lib/md/arrow-back";
import avatarImage from "./ninja_avatar.png";
import avatar_user1 from "./avatar_user_1.jpg";
import { addComment } from "../actions";
import "../App.css";
import "./DetailedPage.css";

class DetailedPage extends Component {
	state = {
		comments: []
	};
	displayComments = comments => {
		if (comments.length === 0) {
			return null;
		}

		return comments.map((comment, index) => {
			return (
				<li className="comment user-comment" key={index}>
					<div className="info">
						<a href="#">Anie Silverston</a>
						<span>4 hours ago</span>
					</div>
					<a className="avatar" href="#">
						<img
							src={avatar_user1}
							width="35"
							alt="Profile Avatar"
							title="Anie Silverston"
						/>
					</a>
					<p>{comment}</p>
				</li>
			);
		});
	};

	addComment = () => {
		const postId = this.props.match.params.id;
		this.props.pushComment(postId, this.textInput.value);
		this.textInput.value = "";
	};

	render() {
		const { title, author, body } = this.props.post;

		const { comments } = this.props;
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
								marginBottom: ".35em",
								fontSize: "1em",
								color: "#666"
							}}
						>
							Comments
						</span>
						<section className="display-comment">
							<ul className="comment-section">
								{this.displayComments(comments)}
							</ul>
						</section>
						<section className="addComment">
							<div className="avatar">
								<img src={avatarImage} alt="avatar" />
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
									<button onClick={this.addComment}>
										Publish
									</button>
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
		}
	};
}

export default connect(mapStateToProps, mapDispatchToActions)(DetailedPage);
