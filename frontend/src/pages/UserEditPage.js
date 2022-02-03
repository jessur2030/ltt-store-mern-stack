import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import styled from "styled-components";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
const LinkNavigate = styled.p`
  margin-top: 3rem;
  cursor: pointer;
  color: #006aff;
  &:hover {
    color: #4a95ff;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;

  /* width: 100%; */
  padding: 10px 18px 10px 8px;

  /* margin-bottom: 20px 0; */
  /* background-color: #333; */
  background-color: #005ad9;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 5px;

  cursor: pointer;
  &:hover {
    background-color: #05c;
  }
`;

const UserEditPage = () => {
  const { id: userId } = useParams();
  //set focus on input: when to the component loads
  const userRef = useRef();
  //set our inputs state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  //dispatch
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  //set focus on input field
  useEffect(() => {
    userRef.current.focus();
  }, [userRef]);

  //redirect if user is already login
  useEffect(() => {
    //if successUpdate: update the user state
    //redirect to userlist
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userlist");
    } else {
      //If not user name, or user id is not equal : user id from the url
      if (!user.name || user._id !== userId) {
        //fetch user
        dispatch(getUserDetails(userId));
      }
      //if user is already here: set user fields
      else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, userId, successUpdate, navigate]);

  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    // updateUser(): take a user object
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to="/admin/userlist" className="">
        <Button>
          <ChevronLeftIcon /> Go back
        </Button>
      </Link>

      <div className="form-container">
        <section className="section-form">
          <div className="form-box">
            <h1>Edit User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <h2 className="errmsg">{errorUpdate}</h2>}
            {loading ? (
              <Loader />
            ) : error ? (
              <h2 className="errmsg">{error}</h2>
            ) : (
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="isadmin"
                      checked={isAdmin}
                      id="isadmin"
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    ></input>
                    <span className="slider round"></span>
                  </label>
                  <label style={{ marginLeft: "5px" }} htmlFor="isadmin">
                    Is admin
                  </label>
                  {/* <input
                    style={{ marginRight: "5px" }}
                    type="checkbox"
                    name="isadmin"
                    checked={isAdmin}
                    id="isadmin"
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                  <label htmlFor="isadmin">Is Admin</label> */}
                </div>{" "}
                <button type="submit" className="btn-form">
                  Continue
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default UserEditPage;
