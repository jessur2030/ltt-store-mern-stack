import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
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

//logout
export const logout = () => (dispatch) => {
  //remove userInfo from local storage
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};
