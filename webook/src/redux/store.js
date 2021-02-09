import { createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./root.reducer";
import thunk from "redux-thunk";

const middlewares = [logger];

const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.log(error);
  }
};

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if(serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState)
  }
  catch(error){
    console.log(error)
    return undefined;
  }
}

const persistedState = loadStateFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

store.subscribe(() => saveStateToLocalStorage(store.getState()))

export default store;
