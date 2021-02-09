import authTypes from "./auth.types";

export const authUser = () => {
  return {
    type: authTypes.AUTH_USER,
  };
};

export const unAuthUser = () => {
  return {
    type: authTypes.UNAUTH_USER,
  };
};
