import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions.js";
import { currencyFormatter, options } from "../utils/utils";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderContants";
import Message from "../components/Message.js";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px " })}
`;
// const Steps = styled.div`
//   padding-top: 20px;
//   font-size: 1rem;
//   text-align: center;
//   ${mobile({ fontSize: "14px", textAlign: "start" })};
// `;

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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* width: 100%; */
  padding: 10px;
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
  ${mobile({ fontSize: ".75rem" })}
`;

const OrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: orderId } = useParams();

  //paypal sdk state
  const [sdkReady, setSdkReady] = useState(false);

  //state form orderDetails
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  //state form orderPay
  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  //state from user login
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //state form orderPay
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    success: successDeliver,
    loading: loadingDeliver,
    error: errorDeliver,
  } = orderDeliver;

  if (!loading) {
    order.itemsPrice = currencyFormatter.format(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }

    //paypal script
    const addPayPalScript = async () => {
      //fetch our client id from our backend endpoint /api/config/paypal
      const { data: clientId } = await axios.get(`/api/config/paypal`);

      //create script
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      //when once this loads
      //dynamically add our paypal script
      script.onload = () => {
        //setSdkReady to true
        setSdkReady(true);
      };

      //add paypal script into the body dynamically
      document.body.appendChild(script);
    };

    //if the order its'n there or we have a success pay: dispatch
    if (!order || successPay || successDeliver) {
      //PREVENT never ending loop after paying
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      //dispatch our action
      dispatch(getOrderDetails(orderId));
    }
    //check is order is not paid
    else if (!order.isPaid) {
      //and if paypal is not in our page body
      if (!window.paypal) {
        //call paypal script
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
    //eslint-disable-next-line
  }, [dispatch, orderId, successPay, order, successDeliver]);

  //successPaymentHandler function
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    //
    dispatch(payOrder(orderId, paymentResult));
  };

  //deliverHandler
  const deliverHandler = () => {
    //
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <h1 className="errMsg">{error}</h1>
  ) : (
    <>
      <Container>
        <Wrapper>
          <h2>Order {order._id}</h2>
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
            <h2 className="success" style={{ padding: "5px" }}>
              Order Delivered on
              {new Date(order.deliveredAt).toLocaleString("en-US", options)}
            </h2>
          ) : order.isPaid ? (
            <>
              <h2
                className="status-alert "
                style={{ padding: "5px", marginBottom: "10px" }}
              >
                Your order is confirmed.
              </h2>
              <p>
                <strong>Estimated delivery: </strong> 5 to 7 bushiness days
              </p>
            </>
          ) : (
            <h2 style={{ padding: "5px" }} className="errmsg">
              Order not confirmed yet.
            </h2>
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
                    {new Date(order.paidAt).toLocaleString("en-US", options)}
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
              {loadingDeliver && <Loader />}
              {errorDeliver && <Message text={errorDeliver}></Message>}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <Button type="button" onClick={deliverHandler}>
                    Mark as delivered
                  </Button>
                )}
            </Summary>
          </Bottom>
        </Wrapper>
      </Container>
    </>
  );
};

export default OrderPage;
