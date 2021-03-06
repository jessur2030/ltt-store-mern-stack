import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import logo from "./logo-ltt.png";
import "./Header.css";
import { logout } from "../actions/userActions.js";
import Badge from "@mui/material/Badge";
import SearchBox from "./SearchBox.js";
import {
  // UilSearch,
  // UilUserCircle,
  UilEllipsisV,
  UilTimes,
  UilShoppingCart,
  // UilMoon,
  // UilSun,
  // UilEdit,
} from "@iconscout/react-unicons";

// import {
//   ShoppingBagOutlined,

// } from "@mui/icons-material";

const brand = {
  hight: "30px",
  width: "30px",
};

const Header = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const quantity = cart.cartItems.reduce((curr, item) => item.qty + curr, 0);
  const [click, setClick] = useState(true);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //handle click
  const handleClick = () => {
    setClick(!click);
    // document.body.classList.toggle("");
  };

  //logout handler
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    // <header id="header">
    <>
      <nav className="navbar">
        {/* //BUG: TODO: fix navbar style issus & state */}
        <div className="navbar-container container">
          <Link className="navbar-brand" to="/">
            <img src={logo} style={brand} alt="LTT logo" />
          </Link>
          <ul className="navbar-nav-left ">
            <li>
              <Link to="/">
                <Button text="All Products" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <Button text="Clothing" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <Button text="Gear" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <Button text=" Gift Cards" />
              </Link>
            </li>
            <li>
              <SearchBox />
            </li>
          </ul>

          <ul className="navbar-nav-right nav-link">
            {/* <li>
              <UilSearch />
            </li> */}
            <li></li>

            {userInfo ? (
              <div className="dropdown">
                <li>
                  {`Hi, ${userInfo.name}`}
                  <div
                    className="dropdown-content"
                    id="username"
                    // title={userInfo.name}
                  >
                    <Link to="/profile">Profile</Link>
                    <span onClick={logoutHandler}>Logout</span>
                  </div>
                </li>
              </div>
            ) : (
              <li>
                <Link to="/login"> Sing in {/* <UilUserCircle /> */}</Link>
              </li>
            )}

            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <li>
                  Admin
                  <div
                    className="dropdown-content"
                    id="username"
                    // title={userInfo.name}
                  >
                    <Link to="/admin/userlist">Users</Link>
                    <Link to="/admin/productlist">Products</Link>
                    <Link to="/admin/orderlist">Orders</Link>
                  </div>
                </li>
              </div>
            )}
            <li>
              <Link to="/cart">
                <Badge badgeContent={quantity} color="primary">
                  <UilShoppingCart />
                </Badge>
              </Link>
            </li>
          </ul>

          <div className="menu">
            <Button
              className={`menu ${!click && "no-scroll"}`}
              id="menu-btn"
              onClick={handleClick}
              text={click ? <UilEllipsisV /> : <UilTimes />}
            />
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${click && "hidden"}  `} id="menu">
        <ul>
          <li>
            <Link to="#">
              <Button text="All Products" />
            </Link>
          </li>
          <li>
            <Link to="#">
              <Button text="Clothing" />
            </Link>
          </li>
          <li>
            <Link to="#">
              <Button text="Gear" />
            </Link>
          </li>
          <li>
            <Link to="#">
              <Button text=" Gift Cards" />
            </Link>
          </li>
        </ul>
      </div>
    </>
    // </header>
  );
};

export default Header;
