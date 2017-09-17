import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';

class HomeCategory extends Component {
	createArticles = posts => {
		return Object.keys(posts).map(id => {
			return (
				!posts[id].deleted && <li key={id}>
					<Post
						title={posts[id].title}
						author={posts[id].author}
						id={id}
						onEdit={this.onEdit}
						onDelete={this.onDelete} />
				</li>
			);
		});
	};
	onEdit = (id) => {

	};
	onDelete = () => {};
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
