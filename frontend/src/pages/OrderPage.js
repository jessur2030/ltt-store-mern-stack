import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
import Newsletter from "../components/Newsletter";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder } from "../actions/orderActions.js";
import { currencyFormatter } from "../utils/utils";
import { ORDER_PAY_RESET } from "../constants/orderContants";

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

const OrderPage = () => {
  const dispatch = useDispatch();
  const { id: orderId } = useParams();
  //paypal sdk state
  const [sdkReady, setSdkReady] = useState(false);

  //locale date options
  // const options = {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // };

  const options = {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  };

  //state form orderDetails
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  //state form orderPay
  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;
  console.log(successPay);

  if (!loading) {
    order.itemsPrice = currencyFormatter.format(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    //addPayPalScript

    const addPayPalScript = async () => {
      //get clientId form our backend endpoint
      const { data: clientId } = await axios.get(`/api/config/paypal`);
      //create new script el
      const script = document.createElement("script");
      script.type = "text/javascript";
      //set our script to async
      script.async = true;
      script.src = ` https://www.paypal.com/sdk/js?client-id=${clientId}`;

      //once our loads
      script.onload = () => {
        //setSdkReady to true
        setSdkReady(true);
      };

      //adds the script to the body
      //dynamically adds our paypal script into the body
      document.body.appendChild(script);
    };
    //check for the order and also make sure that the order ID matches the ID in the URL
    // if (!order || order._id !== id) {
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      //dispatch order details by our url id
      dispatch(getOrderDetails(orderId));
    }
    //if the order is not paid
    else if (!order.isPaid) {
      //and if paypal is not on the page window
      if (!window.paypal) {
        //call the paypal script
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay]);

  //successPaymentHandler function
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    //
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <h1 className="errMsg">{error}</h1>
  ) : (
    <>
      <Container>
        <Wrapper>
          <h1>Order {order._id}</h1>
          <Top>
            <ShippingDetails>
              <h2>Shipping</h2>

              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <p style={{ paddingTop: "10px" }}>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {""}
                {order.shippingAddress.postalCode} {""}
                {order.shippingAddress.country}
              </p>
            </ShippingDetails>
          </Top>
          {order.isDelivered ? (
            <h1 className="success">Order Delivered on {order.deliveredAt}</h1>
          ) : (
            <h1 className="errmsg">Not delivered</h1>
          )}
          <Bottom>
            <Info>
              {order.orderItems.map((item, index) => (
                <Product key={index}>
                  <ProductDetail>
                    <Image src={item.image} />

                    <Details>
                      <ProductName>
                        <b>Product:</b>{" "}
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
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
                <SummaryItemPrice> {order.paymentMethod}</SummaryItemPrice>
              </SummaryItem>
              {order.isPaid ? (
                <SummaryItem className="success">
                  <SummaryItemText>
                    <strong> Paid on</strong>
                  </SummaryItemText>
                  <SummaryItemPrice>
                    {" "}
                    {order.paidAt.substring(0, 10)}
                  </SummaryItemPrice>
                </SummaryItem>
              ) : (
                <SummaryItem className="errmsg">
                  <SummaryItemText>
                    <strong> Not Paid </strong>
                  </SummaryItemText>
                  <SummaryItemPrice> </SummaryItemPrice>
                </SummaryItem>
              )}
              <SummaryItem>
                <SummaryItemText>
                  {" "}
                  Items (
                  {order.orderItems.reduce((curr, item) => item.qty + curr, 0)})
                </SummaryItemText>
                <SummaryItemPrice>{order.itemsPrice}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping</SummaryItemText>
                <SummaryItemPrice>
                  {currencyFormatter.format(order.shippingPrice)}
                </SummaryItemPrice>
              </SummaryItem>
              {/* <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem> */}
              <SummaryItem>
                <SummaryItemText>Tax</SummaryItemText>
                <SummaryItemPrice>
                  {currencyFormatter.format(order.taxPrice)}{" "}
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>
                  {currencyFormatter.format(order.totalPrice)}
                </SummaryItemPrice>
              </SummaryItem>
              {/* if order is not paid yet: */}
              {!order.isPaid && (
                <>
                  {/* //check if loadingPay is true: if is loading: show Loader */}
                  {loadingPay && <Loader />}
                  {/* if sdk is not ready: show Loader */}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    //paypalButton takes two things:the amount and an onSuccess Handler
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </>
              )}
            </Summary>
          </Bottom>
        </Wrapper>
      </Container>
    </>
  );
};

export default OrderPage;