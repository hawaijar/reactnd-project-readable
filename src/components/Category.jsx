import React, {Component} from 'react';
import {connect} from 'react-redux';
import orderBy from 'lodash/orderBy';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import Dialog from 'material-ui/Dialog';
import uuid from 'uuid/v1';
import SemanticForm from './SemanticForm';
import Post from './Post';
import {addPost} from '../actions';

class Category extends Component {
    state = {
        modalIsOpen: false,
        sortingOrder: 'timeStamp',
        dropdownOpen: false,
    };
    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    };
    onDelete = () => {
    };
    onModalOpen = (e) => {
        e.preventDefault();
        this.setState({modalIsOpen: true});
    };
    onModalClose = (e) => {
        e.preventDefault();
        this.setState({modalIsOpen: false});
    };
    onAdd = (post) => {
        //this.props.newPost(post);
        console.log(post)
    };
    onSubmit = (formData) => {
        const post = {
            id: uuid(),
            title: formData.title,
            body: formData.body,
            timestamp: new Date().toString(),
            voteScore: 1,
            author: 'Stan Lee',
            comments: [],
            deleted: false,
            category: formData.category,
        };
    };
    hasMatchedCategory = (c, category) =>
        c.toLowerCase() === category.toLowerCase();
    handleChange = (event) => {
        const sortBy = event.target.value;
        this.setState({sortingOrder: sortBy});
    };
    displayArticles = () => {
        let {data: posts} = this.props;
        posts = orderBy(posts, [this.state.sortingOrder], ['desc']);
        return posts.map(post =>
            !post.deleted &&
            <li key={post.id} className="pb-2">
                <Post {...post} />
            </li>);
    };

    componentWillReceiveProps(nextProps) {
        this.setState({modalIsOpen: false});
    }

    render() {
        const actions = [
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-primary p-3">Submit</button>
                ,
                <button type="button" className="btn btn-secondary" onClick={this.onModalClose}>
                    Cancel
                </button>
            </div>
        ];
        return (
            <div className="container-fluid">
                <div className="post">
                    <Dialog
                        title="Create new post"
                        modal={false}
                        open={this.state.modalIsOpen}
                        onRequestClose={this.onModalClose}
                    >
                        <SemanticForm
                            category={this.props.category}
                            categories={this.props.categories}
                            onAdd = {this.onAdd}
                            onModalClose={this.onModalClose}
                        />
                    </Dialog>
                    <div className="mt-3 container-fluid">
                        <div className="row justify-content-start">
                            <button
                                className="btn btn-primary text-white"
                                onClick={this.onModalOpen}
                            >Add Post
                            </button>
                            <div>
                                {this.props.data.length > 0 && <div style={{display: 'flex'}}>
                                    <span className="align-self-center ml-5">Sort by: </span>
                                    <DropdownButton
                                        className="btn-outline-secondary ml-2"
                                        title="Vote score"
                                        id="bg-justified-dropdown"
                                    >
                                        <MenuItem eventKey="1">Vote score</MenuItem>
                                        <MenuItem eventKey="2">Last updated time</MenuItem>
                                    </DropdownButton>
                                </div>}
                            </div>

                        </div>

                    </div>
                    <ul className="list-articles mt-3">
                        {this.displayArticles()}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapDispatchToActions(dispatch) {
    return {
        newPost(post) {
            dispatch(addPost(post));
        },
    };
}

function mapStateToProps(state, ownProps) {
    return {
        data:
            ownProps.category === 'home'
                ? state.home
                : state.home.filter(post => post.category === ownProps.category),
    };
}

export default connect(mapStateToProps, mapDispatchToActions)(Category);
