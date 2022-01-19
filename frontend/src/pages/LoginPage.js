import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Loader from "../components/Loader";
import "./UserForm.css";

const LoginPage = () => {
  //set focus on the first input: when to the component loads
  const userRef = useRef();
  //set focus on the errors: specially when Accessability
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // //error messages state
  // const [errMsg, setErrMsg] = useState("");

  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  //from userLogin
  const { loading, error, userInfo } = userLogin;
  //option to have some  kind of redirect
  const redirect = search ? search.split("=")[1] : "/";

  //redirect if we are already login
  useEffect(() => {
    //
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch login
    dispatch(login(email, password));
  };

  //useEffect: set focus on the first input:
  //when to the component loads
  useEffect(() => {
    userRef.current.focus();
  }, [useRef]);
  // //empty out any err msg that we any have if the user,
  // //changes the user state or the password state
  // //essentially if the user changes anyone of our inputs, we will make our err disappear
  // useEffect(() => {
  //   setErrMsg("");
  // }, [email, password]);
  return (
    <div className="form-container">
      <section className="section-form">
        <div className="form-box">
          {/* <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p> */}
          <h1>Sign in</h1>
          {error && <h3 className="errmsg">{error}</h3>}
          {loading && <Loader />}
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              ref={userRef}
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button type="submit" className="btn-form">
              Sign in
            </button>
          </form>
          <p>
            Don't have an account?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Sign up
            </Link>{" "}
          </p>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
