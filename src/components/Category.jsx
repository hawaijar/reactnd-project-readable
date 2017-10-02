import React, { Component } from 'react';
import { connect } from 'react-redux';
import orderBy from 'lodash/orderBy';
import Post from './Post';
import Modal from './ModalForm';
import { addPost } from '../actions';

class Category extends Component {
	state = {
		modalIsOpen: false,
		sortingOrder: 'timeStamp'
	};
	hasMatchedCategory = (c, category) => {
		return c.toLowerCase() === category.toLowerCase();
	};
	handleChange = event => {
		const sortBy = event.target.value;
		this.setState({ sortingOrder: sortBy });
	};
	displayArticles = () => {
		let { data: posts } = this.props;
		posts = orderBy(posts, [this.state.sortingOrder], ['desc']);
		return posts.map(post => {
			return (
				!post.deleted &&
				<li key={post.id}>
					<Post {...post} />
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
	onAdd = post => {
		this.props.newPost(post);
	};
	componentWillReceiveProps(nextProps) {
		this.setState({ modalIsOpen: false });
	}

	render() {
		return (
			<div>
				<div className="post">
					<Modal
						modalIsOpen={this.state.modalIsOpen}
						onModalClose={this.onModalClose}
						onModalOpen={this.onModalOpen}
						onAdd={this.onAdd}
					/>
					<h2 style={{ display: 'inline-block' }}>Recent Posts</h2>
					<p style={{ display: 'inline-block', margin: '0 1.5em 1em', fontSize: '0.85em' }}>
						Sort by {' '}
						<select value={this.state.sortingOrder} onChange={this.handleChange}>
							<option value="timeStamp">time</option>
							<option value="voteScore">vote</option>
						</select>
					</p>
					<ul className="list-articles">
						{this.displayArticles()}
					</ul>
				</div>
				<div onClick={this.openModal} className="open-search">
					<a onClick={this.onModalOpen} href="/">
						New
					</a>
				</div>
			</div>
		);
	}
}

function mapDispatchToActions(dispatch) {
	return {
		newPost(post) {
			dispatch(addPost(post));
		}
	};
}

function mapStateToProps(state, ownProps) {
	return {
		data: ownProps.category === 'Home' ? state.home : state.home.filter(post => post.category === ownProps.category)
	};
}

export default connect(mapStateToProps, mapDispatchToActions)(Category);
