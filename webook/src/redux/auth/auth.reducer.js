import authTypes from "./auth.types";

const initialState = {
  authenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.AUTH_USER:
      return {
        ...state,
        authenticated: true,
      };
    case authTypes.UNAUTH_USER:
      return {
        ...state,
        authenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
