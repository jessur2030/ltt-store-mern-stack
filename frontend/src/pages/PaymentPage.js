import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions.js";
import CheckoutSteps from "../components/CheckoutSteps.js";

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  ///submit handler function
  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch savePaymentMethod: paymentMethod
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="form-container">
      <CheckoutSteps step1 step2 step3 />
      {/* <section className="section-form"> */}
      <section className="section-payment">
        <div className="form-box">
          {/* <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p> */}
          <h1>Payment Method</h1>

          <form onSubmit={submitHandler}>
            <div
              style={{
                margin: "1rem 0",

                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="radio"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                style={{
                  marginRight: ".5rem",
                  cursor: "pointer",
                }}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label
                style={{
                  display: "flex",
                  marginTop: "0",
                  alignItems: "center",
                }}
                htmlFor="paymentMethod"
              >
                PayPal or Credit Card
              </label>
            </div>

            {/* <button type="submit" className="btn-secondary"> */}
            <button type="submit" className="btn-form">
              Continue
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default PaymentPage;
