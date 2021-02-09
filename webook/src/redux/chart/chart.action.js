import chartTypes from "./chart.types";

export const setSymbol = (input) => {
  return {
    type: chartTypes.SET_SYMBOL,
    payload: input
  };
};

export const setName = (input) => {
  return {
    type: chartTypes.SET_NAME,
    payload: input
  };
};
export const setDescription = (input) => {
  return {
    type: chartTypes.SET_DESCRIPTION,
    payload: input
  };
};

