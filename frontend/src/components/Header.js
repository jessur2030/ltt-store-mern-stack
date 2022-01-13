import React, { useState } from "react";
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

// UilShoppingBag
import logo from "./logo-ltt.png";

const brand = {
  hight: "30px",
  width: "30px",
};

const Header = () => {
  const [click, setClick] = useState(true);

  //handle click
  const handleClick = () => {
    setClick(!click);
    // document.body.classList.toggle("");
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
            <li>
              <Link to="/account">
                <UilUserCircle />
              </Link>
            </li>
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
