import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class HomeCategory extends Component {
	createArticles = posts => {
		return Object.keys(posts).map(id => {
			const epoch = parseInt(id, 10);
			return (
				<li key={id}>
					<h3>
						<Link to={{ pathname: `/post/${id}`, category: 'Home' }}>
							{posts[id].title}
						</Link>
					</h3>
					<div className="format-small">
						<span>
							Submitted on {new Date(epoch).toString()} by <em>{posts[id].author}</em>
						</span>
					</div>
				</li>
			);
		});
	};
	render() {
		return (
			<div className="post">
				<h2>Recent Posts</h2>
				<ul className="list-articles">
					{this.createArticles(this.props.data)}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		data: state.home
	};
}

export default connect(mapStateToProps, null)(HomeCategory);
