export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';

export function addComment(postId, comment) {
  return {
    type: ADD_COMMENT,
    payload: { postId, comment }
  };
}
export function editComment(postId,comment) {
  return {
    type: EDIT_COMMENT,
    payload: { postId, comment }
  };
}
