export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    payload: { comment }
  };
}
export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    payload: { comment }
  };
}
export function deleteComment(comment) {
  return {
    type: DELETE_COMMENT,
    payload: { comment }
  };
}
export function editPost(postId, body) {
  return {
    type: EDIT_POST,
    payload: { postId, body }
  };
}
export function deletePost(postId) {
  return {
    type: DELETE_POST,
    payload: { postId }
  };
}
export function addPost(post) {
  return {
    type: ADD_POST,
    payload: { post }
  };
}
/*
export function sortBy(sortBy) {
  return {
    type: SORT_POST,
    payload: { sortBy }
  };
}*/
