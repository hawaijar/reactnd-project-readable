import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BackIcon from 'react-icons/lib/md/arrow-back';
import '../App.css';
import './DetailedPage.css';
import avatarImage from './ninja_avatar.png';

const DetailedPage = props => {
	const { comments } = props;
	function displayComments() {
		if (Object.keys(comments).length === 0) {
			return null;
		}
	}
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
						{props.post.title}
					</h1>
					<p className="posted-by">
						Posted by {props.post.author}
					</p>
					{props.post.body}
				</article>
				<hr />
				<section className="commentContainer">
					<span style={{ marginBottom: '.35em', fontSize: '1em', color: '#666' }}>Comments</span>
					<section className="addComment">
						<div className="avatar">
							<img src={avatarImage} alt="avatar" />
						</div>
						<div className="comment">
							<textarea placeholder="Add a comment ..." />
						</div>
					</section>
					<section className="displayComment">
						<ul>
							{displayComments()}
						</ul>
					</section>
				</section>
			</div>
		</div>
	);
};

function mapStateToProps(state, ownProps) {
	return {
		post: state.home[ownProps.match.params.id],
		comments: state.home[ownProps.match.params.id].comments
	};
}

export default connect(mapStateToProps, null)(DetailedPage);
