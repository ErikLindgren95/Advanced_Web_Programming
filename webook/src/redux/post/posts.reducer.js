import postTypes from "./post.types";

const initialState = {
  posts: []
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case postTypes.SET_POST:
      return {
        posts:[...action.payload]
      }
    case postTypes.REMOVE_POST: 
      {
        return{
          posts:[...action.payload]
        }
      }
    default:
      return state;
  }
};

export default postReducer;