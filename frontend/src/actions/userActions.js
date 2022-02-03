import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/userConstants";
import { ORDER_LIST_MY_RESET } from "../constants/orderContants.js";

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
  //remove from local storage
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  //Clear state when logout
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: USER_LIST_RESET });
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

//list user admin only route action
export const listUsers = () => async (dispatch, getState) => {
  try {
    //dispatch our action
    dispatch({ type: USER_LIST_REQUEST });

    //get our token from state
    const {
      userLogin: { userInfo },
    } = getState();

    //send our headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //fetch user list
    const { data } = await axios.get(`/api/users`, config);

    //dispatch user list data
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    //dispatch possible error
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//deleteUser action
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    //dispatch our request
    dispatch({ type: USER_DELETE_REQUEST });

    //GET login user token from state
    const {
      userLogin: { userInfo },
    } = getState();

    //send our headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //fetch delete user request
    await axios.delete(`/api/users/${id}`, config);

    //dispatch USER_DELETE_SUCCESS
    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    //DISPATCH POSSIBLE ERROR
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//update user action
//pass user object
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    //dispatch our request
    dispatch({ type: USER_UPDATE_REQUEST });

    //get token from the state
    const {
      userLogin: { userInfo },
    } = getState();

    //send our headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //fetch update user request
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    //dispatch data

    dispatch({ type: USER_UPDATE_SUCCESS });

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    //dispatch possible error
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
