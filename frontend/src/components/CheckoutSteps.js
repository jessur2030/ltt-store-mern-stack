import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StepsContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  justify-content: center;
`;
const StepsItemsContainer = styled.div``;
const StepsItems = styled.span`
  /* font-size: 1rem; */
  margin-right: 1rem;
  color: #000;
  align-items: center;
`;

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <StepsContainer>
      <StepsItemsContainer>
        {step1 ? (
          <Link di to="/login">
            <StepsItems> Sign In </StepsItems>
          </Link>
        ) : (
          <StepsItems style={{ color: "lightgray" }} disabled>
            Sign In
          </StepsItems>
        )}
      </StepsItemsContainer>
      <StepsItemsContainer>
        {step2 ? (
          <Link to="/shipping">
            <StepsItems> Shipping </StepsItems>
          </Link>
        ) : (
          <StepsItems style={{ color: "lightgray" }} disabled>
            Shipping
          </StepsItems>
        )}
      </StepsItemsContainer>
      <StepsItemsContainer>
        {step3 ? (
          <Link to="/payment">
            <StepsItems> Payment </StepsItems>
          </Link>
        ) : (
          <StepsItems style={{ color: "lightgray" }} disabled>
            Payment
          </StepsItems>
        )}
      </StepsItemsContainer>
      <StepsItemsContainer>
        {step4 ? (
          <Link to="/placeorder">
            <StepsItems> Place Order</StepsItems>
          </Link>
        ) : (
          <StepsItems style={{ color: "lightgray" }} disabled>
            Place Order
          </StepsItems>
        )}
      </StepsItemsContainer>
    </StepsContainer>
  );
};

export default CheckoutSteps;
