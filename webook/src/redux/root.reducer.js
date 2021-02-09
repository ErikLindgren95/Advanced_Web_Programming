import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import chartReducer from "./chart/chart.reducder";
import userReducer from "./user/user.reducer"
import postReducer from "./post/posts.reducer"

const rootReducer = combineReducers({
  auth: authReducer,
  chart: chartReducer,
  user: userReducer,
  post: postReducer
});

export default rootReducer;
