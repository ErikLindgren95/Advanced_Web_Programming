import chartTypes from "./chart.types";

const initialState = {
  symbol: "",
  name: "",
  description:""
};

const chartReducer = (state = initialState, action) => {
  switch (action.type) {
    case chartTypes.SET_SYMBOL:
      return {
        ...state,
        symbol: action.payload,
      };
      case chartTypes.SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
      case chartTypes.SET_DESCRIPTION:
      return {
        ...state,
        description: action.payload,
      };
    default:
      return state;
  }
};

export default chartReducer;
