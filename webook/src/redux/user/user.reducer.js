import userTypes from "./user.types";

const initialState = {};


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.SET_CURRENT_USER:
      return {
        ...action.payload,
      };
    case userTypes.CHANGE_ABOUT_USER:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
