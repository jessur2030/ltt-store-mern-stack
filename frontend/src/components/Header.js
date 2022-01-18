import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "./Button";
import {
  UilSearch,
  UilUserCircle,
  UilShoppingCart,
  UilEllipsisV,
  UilTimes,
  UilMoon,
  UilSun,
  UilEdit,
} from "@iconscout/react-unicons";
import "./Header.css";
import { logout } from "../actions/userActions.js";
// UilShoppingBag
import logo from "./logo-ltt.png";

const brand = {
  hight: "30px",
  width: "30px",
};

const Header = () => {
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
  };
  return (
    // <header id="header">
    <>
      <nav className="navbar">
        <div className="navbar-container">
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
          </ul>

          <ul className="navbar-nav-right nav-link">
            <li>
              <UilSearch />
            </li>
            <div className="dropdown">
              <li>
                <UilUserCircle />
                <div
                  className="dropdown-content"
                  id="username"
                  // title={userInfo.name}
                >
                  <Link to="/profile">Profile</Link>
                  {userInfo ? (
                    <span onClick={logoutHandler}>Logout</span>
                  ) : (
                    <Link to="/login">Login</Link>
                  )}
                </div>
              </li>
            </div>
            <li>
              <Link to="/cart">
                <UilShoppingCart />
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
          {/* 
          <button
            type="button"
            className="hamburger"
            onClick={handleClick}
            id="menu-btn"
            >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button> */}
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
