import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import { currencyFormatter } from "../utils/utils.js";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px " })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  padding: 20px;
  font-weight: 300;
  ${mobile({ padding: "10px 0" })}
`;

const ProductList = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection: "column" })};
  ${tablet({ flexDirection: "column" })};
  gap: 1rem;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  background-color: coral;
  justify-content: space-between;
  margin-top: 20px;
  /* margin-right: 20px; */
  /* box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.15); */

  ${tablet({ flexDirection: "column", overflowX: "auto" })}
  ${mobile({ flexDirection: "column", overflowX: "auto" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  /* flex-direction: column; */
  flex-direction: row;
  justify-content: space-around;
  gap: 1rem;
  ${mobile({
    flexDirection: "column",
  })}
`;

const RemoveProduct = styled.p`
  cursor: pointer;
  color: #006aff;
  &:hover {
    color: #4a95ff;
  }
`;

const Hr = styled.hr`
  background-color: #e0e0e0;
  border: none;
  height: 1px;
`;

const OrderDetails = styled.span`
  font-size: 1rem;
  font-weight: 400;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 70%;
  /* height: 22rem; */
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px 0;
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

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;
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
        //dispatch get user details
        dispatch(getUserDetails("/profile"));
        //dispatch get list orders
        dispatch(listMyOrders());
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
    <Container>
      <Wrapper>
        <Title> User Profile</Title>
        <Top>
          {message && <h3 className="errmsg">{message}</h3>}
          {error && <h3 className="errmsg">{error}</h3>}
          {success && <h3 className="success">Profile updated</h3>}
          {loading && <Loader />}
        </Top>
        {/* // TODO: fix the styles */}
        <ProductList>
          <Info>
            <h2>My orders</h2>
            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <h2 className="errmsg">{errorOrders}</h2>
            ) : (
              <>
                <Product>
                  <table>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td> {order.createdAt.substring(0, 10)}</td>
                          <td class="amount">
                            {currencyFormatter.format(order.totalPrice)}
                          </td>

                          <td>
                            {order.isPaid ? (
                              <p class="status status-paid">
                                {order.paidAt.substring(0, 10)}
                              </p>
                            ) : (
                              <p class="status status-unpaid">Not Paid</p>
                            )}
                          </td>

                          <td>
                            {" "}
                            {order.isDelivered
                              ? order.deliveredAt.substring(0, 10)
                              : `Not delivered`}
                          </td>
                          <td>
                            {" "}
                            <Link to={`/order/${order._id}`}>
                              <RemoveProduct>Details</RemoveProduct>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Product>
              </>
            )}
          </Info>
          <Summary>
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
              <Button style={{ marginTop: "1rem" }} type="submit">
                Update
              </Button>
              {/* <button type="submit" className="btn-form">
                Update
              </button> */}
            </form>
          </Summary>
        </ProductList>
      </Wrapper>
    </Container>
  );
};

export default ProfilePage;
