import React, { useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
import Newsletter from "../components/Newsletter";
import CheckoutSteps from "../components/CheckoutSteps";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px " })}
`;
const Steps = styled.div`
  padding-top: 20px;
  /* font-weight: 300; */
  font-size: 1rem;
  text-align: center;
  ${mobile({ fontSize: "14px", textAlign: "start" })};
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  padding: 20px;
  font-weight: 300;

  ${mobile({ padding: "10px 0" })}
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ShippingDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const Hr = styled.hr`
  background-color: #eeee;
  border: none;
  height: 1px;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
  })}
`;

const ProductPrice = styled.span`
  font-size: 30px;
  font-weight: 200;
`;
const Products = styled.span`
  font-size: 1rem;
  font-weight: 200;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 70%;
  /* height: 22rem; */
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  display: flex;
  margin: 30px 0px;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "20 px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px 0;
  background-color: #333;
  color: #fff;
  font-weight: 600;
  border: none;

  cursor: pointer;
`;

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  //helper function: add decimals to a giving num
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
  //ORDER SUMMARY CALCULATIONS:
  //Calculate Price
  //create them and them add into the cart object
  //items price
  //acc: accumulator, item: current item
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  //Calculate Shipping price
  cart.shippingPrice = addDecimals(cart.itemsPrice > 75 ? 0 : 7);
  //tax price
  cart.taxPrice = addDecimals(Number(0.06 * cart.itemsPrice).toFixed(2));
  //total price
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const placeOrderHandler = () => {
    console.log("place order!!!");
  };
  return (
    <Container>
      <Wrapper>
        <Steps>
          <CheckoutSteps step1 step2 step3 step4 />
        </Steps>
        <Top>
          <ShippingDetails>
            <h2>Shipping</h2>
            <p style={{ paddingTop: "10px" }}>
              <strong>Address: </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city} {""}
              {cart.shippingAddress.postalCode} {""}
              {cart.shippingAddress.country}
            </p>
          </ShippingDetails>
        </Top>
        <Bottom>
          <Info>
            {cart.cartItems.map((item, index) => (
              <Product key={index}>
                <ProductDetail>
                  <Image src={item.image} />

                  <Details>
                    <ProductName>
                      <b>Product:</b> {item.name}
                    </ProductName>

                    {/* <ProductId>
                      <b>Item Id:</b> {item.product}
                    </ProductId>
                    <ProductColor color={item.color} />

                    <ProductSize>
                      <b>Size:</b> {item.size}
                    </ProductSize> */}
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductPrice>${item.qty * item.price}</ProductPrice>
                  <Products>
                    {item.qty} x {item.price}
                  </Products>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>
                <strong> Payment Method</strong>
              </SummaryItemText>
              <SummaryItemPrice> {cart.paymentMethod}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>
                {" "}
                Items (
                {cart.cartItems.reduce((curr, item) => item.qty + curr, 0)})
              </SummaryItemText>
              <SummaryItemPrice>$ {cart.itemsPrice}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping</SummaryItemText>
              <SummaryItemPrice>$ {cart.shippingPrice}</SummaryItemPrice>
            </SummaryItem>
            {/* <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem> */}
            <SummaryItem>
              <SummaryItemText>Tax</SummaryItemText>
              <SummaryItemPrice>$ {cart.taxPrice} </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.totalPrice}</SummaryItemPrice>
            </SummaryItem>

            <Button
              type="button"
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;
