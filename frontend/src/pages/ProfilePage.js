import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
const ProfilePage = () => {
  //set focus on the first input: when to the component loads
  const userRef = useRef();
  //set our inputs state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  //get search from url

  //dispatch
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  //set focus on input field
  useEffect(() => {
    userRef.current.focus();
  }, [userRef]);

  useEffect(() => {
    //if user is not login: redirect to login page
    if (!userInfo) {
      navigate("/login");
    } else {
      //if not user : name : dispatch /profile
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("/profile"));
      } else {
        //if we do have the user: set the form fields
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, dispatch, user, success]);

  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch register data
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      //dispatch update profile :takes the user object
      //pass user object we want to pass in to the action: { id: user._id, name, email, password }
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <section>
      <h2>User Profile</h2>
      <div className="box box-b  grid-col-2">
        <div className="">
          {message && <h3 className="errmsg">{message}</h3>}
          {error && <h3 className="errmsg">{error}</h3>}
          {success && <h3 className="success">Profile updated</h3>}
          {loading && <Loader />}
          <form onSubmit={handleSubmit} autoComplete="off">
            <label htmlFor="name">Name</label>
            <input
              type="name"
              id="name"
              autoComplete="off"
              placeholder="Enter Name"
              ref={userRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              // required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              autoComplete="off"
              id="email"
              placeholder="Enter email"
              ref={userRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              // required
            />
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              autoComplete="off"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              // required
            />
            <button type="submit" className="btn-form">
              Update
            </button>
          </form>
        </div>

        <div className="box-text">
          <h2>My order</h2>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
