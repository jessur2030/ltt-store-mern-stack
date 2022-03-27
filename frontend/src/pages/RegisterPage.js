import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";

const RegisterPage = () => {
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
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const { search } = useLocation();

  const redirect = useLocation().search ? search.split("=")[1] : "/";
  //set focus on input field
  useEffect(() => {
    userRef.current.focus();
  }, [userRef]);

  //redirect if user is already login
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch register data
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

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
          <h1>Register</h1>
          {message && <h3 className="errmsg">{message}</h3>}
          {error && <h3 className="errmsg">{error}</h3>}
          {loading && <Loader />}
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              id="name"
              placeholder="Enter Name"
              ref={userRef}
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
              autoComplete="off"
              value={password}
              required
            />
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
            <button type="submit" className="btn-form">
              Continue
            </button>
          </form>
          <p>
            Have an account?{" "}
            <Link
              style={{
                color: "005ad9",
                textDecoration: "#005ad9 wavy underline",
                fontWeight: "600",
              }}
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
            >
              Login
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
