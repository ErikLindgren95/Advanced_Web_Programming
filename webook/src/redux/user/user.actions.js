import userTypes from "./user.types";
import axios from "axios"

export const setCurrentUser = user => {
  return {
    type: userTypes.SET_CURRENT_USER,
    payload: user
  };
};

export const changeAboutUser = (input) => {
  return {
    type: userTypes.CHANGE_ABOUT_USER,
    payload: input
  };
};
