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
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
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

//logout
export const logout = () => (dispatch) => {
  //remove userInfo from local storage
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
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

//getUserDetails action
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    //dispatch our request
    dispatch({ type: USER_DETAILS_REQUEST });

    //destructure userLogin and get user : token
    const {
      userLogin: { userInfo },
    } = getState();

    //send our headers: "Content-Type" of "application/json"
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //fetch user data
    const { data } = await axios.get(`/api/users/${id}`, config);

    //dispatch our user DETAILS data
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    //dispatch possible error
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//updateUserProfile action
//pass user object
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    //dispatch our request
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    //destructure userLogin and get user : token
    const {
      userLogin: { userInfo },
    } = getState();

    //send our headers: "Content-Type" of "application/json"
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //put() update request
    const { data } = await axios.put(`/api/users/profile`, user, config);

    //dispatch our user UPDATE PROFILE_data
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });

    ///dispatch user login
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    //SET userInfo to localStorage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    //dispatch possible error
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
