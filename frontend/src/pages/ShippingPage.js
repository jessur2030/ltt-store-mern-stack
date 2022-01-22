import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions.js";
import CheckoutSteps from "../components/CheckoutSteps.js";
const ShippingPage = () => {
  const navigate = useNavigate();
  //set focus on the first input: when to the component loads
  const userRef = useRef();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  //initial shipping address state
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  //define dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    userRef.current.focus();
  }, [userRef]);

  //submit handler function
  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch saveShippingAddress
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <div className="form-container">
      <CheckoutSteps step1 step2 />
      <section className="section-payment">
        <div className="form-box">
          <h1>Shipping Address</h1>
          <form onSubmit={submitHandler}>
            <label htmlFor="address">Address</label>
            <input
              type="address"
              id="address"
              placeholder="Enter address"
              ref={userRef}
              autoComplete="off"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <label htmlFor="city">City</label>
            <input
              type="city"
              id="city"
              placeholder="Enter City"
              autoComplete="off"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="postalCode"
              id="postalCode"
              placeholder="Enter Postal Code"
              autoComplete="off"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
            <label htmlFor="country">Country</label>
            <input
              type="country"
              id="country"
              placeholder="Enter Country"
              autoComplete="off"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />

            <button type="submit" className="btn-form">
              Continue
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ShippingPage;
