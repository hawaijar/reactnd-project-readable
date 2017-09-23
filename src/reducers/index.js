import { combineReducers } from 'redux';
import { ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT, EDIT_POST, DELETE_POST, ADD_POST } from '../actions';

const initialState = {
  '1504323052905': {
    title: 'The amazing Spiderman',
    body: `The Amazing Spider-Man is a 2012 American superhero 
    film based on the Marvel Comics character Spider-Man, and sharing the title of the character's 
    longest-running comic book. It is the fourth theatrical Spider-Man film produced by Columbia Pictures 
    and Marvel Entertainment, and a reboot of Sam Raimi's Spider-Man 2002-2007 trilogy preceding it. 
    The film was directed by Marc Webb. The film tells the story of Peter Parker, a teenager from 
    New York who becomes Spider-Man after being bitten by a genetically altered spider. 
    Parker must stop Dr. Curt Connors as a mutated lizard, from spreading a mutation serum 
    to the city's human population.`,
    timestamp: new Date().toString(),
    score: 1,
    author: 'Stan Lee',
    comments: [],
    deleted: false,
    category: 'React',
    voteScore: 10
  },
  '1504323052908': {
    title: 'The genius Iron Man',
    body: `Iron Man is a fictional superhero appearing in American comic books published by Marvel Comics. 
    The character was created by writer and editor Stan Lee, developed by scripter Larry Lieber, and 
    designed by artists Don Heck and Jack Kirby. The character made his first appearance in Tales of 
    Suspense #39 (cover dated March 1963).A wealthy American business magnate, playboy, and ingenious scientist, 
    Anthony Edward "Tony" Stark suffers a severe chest injury during a kidnapping in which his captors attempt 
    to force him to build a weapon of mass destruction. He instead creates a powered suit of armor to save his life 
    and escape captivity. Later, Stark augments his suit with weapons and other technological devices he designed 
    through his company, Stark Industries. He uses the suit and successive versions to protect the world as Iron Man, 
    while at first concealing his true identity. Initially, Iron Man was a vehicle for Stan Lee to explore 
      Cold War themes, particularly the role of American technology and business in the fight against 
    communism.[1] Subsequent re-imaginings of Iron Man have transitioned from Cold War themes to contemporary 
    concerns, such as corporate crime and terrorism`,
    timestamp: new Date().toString(),
    score: 1,
    author: 'Stan Lee',
    comments: [],
    deleted: false,
    category: 'Udacity',
    voteScore: 20
  },
  '1504323052909': {
    title: 'The incredible Hulk',
    body: `The Hulk is a fictional superhero appearing in American comic books published by Marvel Comics. 
    Created by writer Stan Lee and artist Jack Kirby, the character first appeared in the debut issue of The 
    Incredible Hulk (May 1962). In his comic book appearances, the character is both the Hulk, a green-skinned, 
    hulking and muscular humanoid possessing a vast degree of physical strength, and his alter ego Bruce Banner, 
    a physically weak, socially withdrawn, and emotionally reserved physicist, the two existing as personalities 
    independent and resenting of the other.`,
    timestamp: new Date().toString(),
    score: 1,
    author: 'Stan Lee',
    comments: [],
    deleted: false,
    category: 'React',
    voteScore: 5
  }
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT: {
      const { comment } = action.payload;
      const parentId = comment.parentId;
      let updatedPost = state[parentId];
      updatedPost.comments = [...updatedPost.comments, comment];
      return { ...state, [parentId]: updatedPost };
    }
    case EDIT_COMMENT: {
      const { comment } = action.payload;
      const parentId = comment.parentId;
      let updatedPost = state[parentId];
      updatedPost.comments = updatedPost.comments.filter(eachComment => comment.id !== eachComment.id);
      updatedPost.comments = [...updatedPost.comments, comment];
      return { ...state, [parentId]: updatedPost };
    }
    case DELETE_COMMENT: {
      const { comment } = action.payload;
      const parentId = comment.parentId;
      let updatedPost = state[parentId];
      updatedPost.comments = updatedPost.comments.filter(eachComment => comment.id !== eachComment.id);
      return { ...state, [parentId]: updatedPost };
    }
    case EDIT_POST: {
      const { postId, body } = action.payload;
      let updatedPost = state[postId];
      updatedPost.body = body;
      return { ...state, [postId]: updatedPost };
    }
    case DELETE_POST: {
      const { postId } = action.payload;
      let updatedPost = state[postId];
      updatedPost.deleted = true;
      return { ...state, [postId]: updatedPost };
    }
    case ADD_POST: {
      const { post } = action.payload;
      return { ...state, [post.id]: post };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  home
});
export default rootReducer;
