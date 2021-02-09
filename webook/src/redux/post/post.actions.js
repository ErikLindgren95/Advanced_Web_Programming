import postTypes from "./post.types";
import store from "../store"


export const setPostList = (input) => {
  return {
    type: postTypes.SET_POST,
    payload: input
  };
};

export const removePost = (input) => {
  return {
    type: postTypes.REMOVE_POST,
    payload: input

  }
}

