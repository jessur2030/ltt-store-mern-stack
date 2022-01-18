import axios from "axios";
import { async } from "regenerator-runtime";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";

//dispatch our request
//make our request
export const login = (email, password) => async (dispatch) => {
  try {
    //dispatch our request
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    //send our headers: "Content-Type" of "application/json"
    const config = { headers: { "Content-Type": "application/json" } };

    //make our request & fetch our user
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    //dispatch user data
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    //set userInfo to localStorage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    //dispatch possible error
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//register action
export const register = (name, email, password) => async (dispatch) => {
  try {
    //dispatch our request
    dispatch({ type: USER_REGISTER_REQUEST });

    //send our headers: "Content-Type" of "application/json"
    const config = { headers: { "Content-Type": "application/json" } };

    //fetch user data
    const { data } = await axios.post(
      `/api/users`,
      { name, email, password },
      config
    );

    //dispatch our user register data
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    //dispatch login  new user after register
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    //dispatch possible error
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//logout
export const logout = () => (dispatch) => {
  //remove userInfo from local storage
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};
