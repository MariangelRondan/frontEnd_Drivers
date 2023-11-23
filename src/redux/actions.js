import axios from "axios";
export const GET_DRIVERS = "GET_DRIVERS";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_BY_ID = "GET_BY_ID";
export const ORDER_BY_DOB = "ORDER_BY_DOB";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const FILTER_TEAM = "FILTER_TEAM";
export const ORDER = "ORDER";
export const GET_TEAMS = "GET_TEAMS";
export const CLEAR = "CLEAR";
export const ORIGIN = "ORIGIN";
export const ADD_FAV = "ADD_FAV";
export const REMOVE_FAV = "REMOVE_FAV";
const URL = import.meta.env.VITE_BACK_URL;

export const getDrivers = () => {
  const endpoint = `${URL}/drivers`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
      return dispatch({
        type: GET_DRIVERS,
        payload: data,
      });
    } catch (error) {
      console.log({ error: error.message });
    }
  };
};

export const getDriverByName = (name) => {
  const endpoint = `${URL}/drivers?name=${name}`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
      return dispatch({
        type: GET_BY_NAME,
        payload: data,
      });
    } catch (error) {
      alert("Oh, oh... Driver not found!");
    }
  };
};

export const getDriverByID = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/drivers/${id}`;

      const response = await axios.get(endpoint);

      const data = response.data;
      return dispatch({
        type: GET_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const order = (order) => {
  return {
    type: ORDER,
    payload: order,
  };
};

export const filterByTeam = (team) => {
  return {
    type: FILTER_TEAM,
    payload: team,
  };
};

export const getTeams = () => {
  // const endpoint = "http://localhost:3001/teams";
  const endpoint = `${URL}/teams`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
      return dispatch({
        type: GET_TEAMS,
        payload: data,
      });
    } catch (error) {
      console.log({ error: error.message });
    }
  };
};

export const filterOrigin = (origin) => {
  return {
    type: ORIGIN,
    payload: origin,
  };
};

export const clearFilters = () => {
  return {
    type: CLEAR,
  };
};
