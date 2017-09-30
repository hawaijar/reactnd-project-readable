import React, { Component } from 'react';
import { connect } from 'react-redux';
import orderBy from 'lodash/orderBy';
import Post from './Post';
import Modal from './ModalForm';

function toCapitalize(str) {
	if (typeof str === 'string') {
		const lowercase = str.toLowerCase();
		return `${lowercase.charAt(0).toUpperCase()}${str.slice(1)}`;
	}
	return null;
}

class Category extends Component {
	state = {
		modalIsOpen: false
	};
	hasMatchedCategory = (c, category) => {
		return c.toLowerCase() === category.toLowerCase();
	};
	createArticles = (posts, category) => {
		posts = orderBy(posts, ['voteScore'], ['desc']);
		//const condition = (category === 'home')?true:
		return posts.map(post => {
			return (
				!post.deleted &&
				(category.toLowerCase() === 'home' ? true : this.hasMatchedCategory(post.category, category)) &&
				<li key={post.id}>
					<Post
						title={post.title}
						author={post.author}
						id={post.id}
						onDelete={this.onDelete}
						voteScore={post.voteScore}
					/>
				</li>
			);
		});
	};
	onDelete = () => {};
	onModalOpen = e => {
		e.preventDefault();
		this.setState({ modalIsOpen: true });
	};
	onModalClose = e => {
		e.preventDefault();
		this.setState({ modalIsOpen: true });
	};
	render() {
		const { category } = this.props;
		return (
			<div>
				<div className="post">
					<Modal
						modalIsOpen={this.state.modalIsOpen}
						onModalClose={this.onModalClose}
						onModalOpen={this.onModalOpen}
					/>
					<h2>Recent Posts</h2>
					<ul className="list-articles">
						{this.createArticles(this.props.data, category)}
					</ul>
				</div>
				<div onClick={this.openModal} className="open-search">
					<a onClick={this.onOpen} href="/">
						New
					</a>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		data: state.home
	};
}

export default connect(mapStateToProps, null)(Category);
