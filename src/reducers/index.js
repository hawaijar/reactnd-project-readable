import { combineReducers } from 'redux';
import find from 'lodash/find';
import orderBy from 'lodash/orderBy';
import { ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT, EDIT_POST, DELETE_POST, ADD_POST, SORT_POST } from '../actions';
import data from './data';

const home = (state = data.home, action) => {
  switch (action.type) {
    case ADD_COMMENT: {
      const { comment } = action.payload;
      const { parentId } = comment;
      const updatedPost = find(state, { id: parentId });
      updatedPost.comments = [...updatedPost.comments, comment];
      const updatedState = [...state.filter(p => updatedPost.id !== p.id), updatedPost];
      return [...updatedState];
    }
    case EDIT_COMMENT: {
      const { comment } = action.payload;
      const { parentId } = comment;
      const updatedPost = find(state, { id: parentId });
      updatedPost.comments = [...updatedPost.comments.filter(c => c.id !== comment.id), comment];
      const updatedState = [...state.filter(p => updatedPost.id !== p.id), updatedPost];
      return [...updatedState];
    }
    case DELETE_COMMENT: {
      const { comment } = action.payload;
      const { parentId } = comment;
      const updatedPost = find(state, { id: parentId });
      updatedPost.comments = [...updatedPost.comments.filter(c => c.id !== comment.id), comment];
      const updatedState = [...state.filter(p => updatedPost.id !== p.id), updatedPost];
      return [...updatedState];
    }
    case EDIT_POST: {
      const { post } = action.payload;
      const updatedPost = find(state, { id: post.id });
      const updatedState = [...state.filter(p => post.id !== p.id), updatedPost];
      return [...updatedState];
    }
    case DELETE_POST: {
      const { postId } = action.payload;
      const updatedPost = find(state, { id: postId });
      updatedPost.deleted = true;
      if (updatedPost.comments.length > 0) {
        for (let i = 0; i < updatedPost.comments.length; i += 1) {
          updatedPost.comments[i].parentDeleted = true;
        }
      }
      const updatedState = [...state.filter(post => post.id !== postId), updatedPost];
      return [...updatedState];
    }
    case ADD_POST: {
      const { post } = action.payload;
      return [...state, post];
    }
    case SORT_POST: {
      const { sortMethod } = action.payload;
      return orderBy(state, [`${sortMethod}`], ['desc']);
    }
    default:
      return orderBy(state, ['timeStamp'], ['desc']);
  }
};

const rootReducer = combineReducers({
  home
});
export default rootReducer;
