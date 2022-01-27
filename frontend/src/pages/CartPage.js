import React, { useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";

//addToCart action
import { addToCart, removeCartItem } from "../actions/cartActions";

import Newsletter from "../components/Newsletter";
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

const ProductName = styled.span`
  color: #000;
  font-weight: 500;
`;

const ProductCountInStock = styled.span``;

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

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({
    flexDirection: "column",
    // flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: "10px 0",
  })}
`;

const ProductPrice = styled.span`
  font-size: 1.5rem;
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

const Select = styled.select`
  padding: 10px 15px;
  margin-right: 20px;
  font-weight: 600;
  ${mobile({ margin: "10px 0" })}
  cursor:pointer;
`;
const Option = styled.option`
  font-weight: 600;
  cursor: pointer;
`;

const CartPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const search = useLocation().search;
  const qty = search ? +search.split("=")[1] : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  //useEffect
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  // const navigate = useNavigate();

  //remove item from cart handler
  const removeFromCartHandler = (id) => {
    dispatch(removeCartItem(id));
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  return (
    <Container>
      <Wrapper>
        <Title>Your Bag</Title>
        <Top></Top>
        {cartItems.length === 0 ? (
          <div className="message-container">
            <div
              style={
                {
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                }
              }
            >
              <h2 style={{ paddingBottom: ".75rem", textAlign: "center" }}>
                {" "}
                Nothing yet.
              </h2>{" "}
              <p style={{ paddingBottom: "1.75rem" }}>
                Start adding to your cart to view them here.
              </p>
              <Link to="/">
                <Button>Browse Products</Button>
              </Link>
            </div>
          </div>
        ) : (
          <ProductList>
            <Info>
              {cart.cartItems.map((item, index) => (
                <Product key={index}>
                  <ProductDetail>
                    <Image src={item.image} />

                    <Details>
                      <ProductCountInStock>
                        {item.countInStock > 0 ? (
                          <p style={{ color: "#00B23B" }}> In stock</p>
                        ) : (
                          <p style={{ color: "red" }}></p>
                        )}
                      </ProductCountInStock>
                      <ProductName>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </ProductName>
                      <Select
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <Option key={x + 1} value={x + 1}>
                            {x + 1}
                          </Option>
                        ))}
                      </Select>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductPrice>
                      {currencyFormatter.format(item.qty * item.price)}
                    </ProductPrice>
                    <RemoveProduct
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Remove
                    </RemoveProduct>
                  </PriceDetail>
                  <Hr />
                </Product>
              ))}
            </Info>
            <Summary>
              <SummaryTitle>Order Summary</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>
                  Subtotal items (
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                </SummaryItemText>
                <SummaryItemPrice>
                  {" "}
                  {currencyFormatter.format(
                    cartItems.reduce(
                      (acc, item) => acc + item.qty * item.price,
                      0
                    )
                  )}
                </SummaryItemPrice>
                {/* <SummaryItemPrice>$ {cart.total}</SummaryItemPrice> */}
              </SummaryItem>
              {/* <SummaryItem>
                <SummaryItemText>Shipping</SummaryItemText>
                <SummaryItemPrice>To be calculated</SummaryItemPrice>
              </SummaryItem> */}
              <SummaryItem>
                <SummaryItemText>Tax</SummaryItemText>
                <SummaryItemPrice>To be calculated</SummaryItemPrice>
              </SummaryItem>

              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                {/* <SummaryItemPrice>$ {cart.total}</SummaryItemPrice> */}
                <SummaryItemPrice>
                  {currencyFormatter.format(
                    cartItems.reduce(
                      (acc, item) => acc + item.qty * item.price,
                      0
                    )
                  )}
                  {/* {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)} */}
                </SummaryItemPrice>
              </SummaryItem>

              <Button
                type="button"
                disabled={cart.cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Place Order
              </Button>
            </Summary>
          </ProductList>
        )}
      </Wrapper>
    </Container>
  );
};

export default CartPage;
