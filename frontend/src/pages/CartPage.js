import React, { useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { desktop, mobile, tablet } from "../responsive";

//addToCart action
import { addToCart, removeCartItem } from "../actions/cartActions";
import { UilTrashAlt } from "@iconscout/react-unicons";
import Newsletter from "../components/Newsletter";

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
  justify-content: space-between;
  padding: 20px;
  ${mobile({ padding: "10px 0" })}
`;

const TopButton = styled.button`
  width: 11rem;
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "#333" : "transparent"};
  color: ${(props) => props.type === "filled" && "#fff"};
  ${mobile({ width: "10rem" })}
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  /* cursor: pointer; */
  margin: 0 10px;
`;

const Bottom = styled.div`
  /* cursor: pointer; */
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const BottomRemove = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 40px;
  margin-bottom: 10px;
  ${mobile({ marginBottom: "0" })}
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

const ProductColor = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  /* cursor: pointer; */
`;

const ProductSize = styled.div``;

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
  })}/* ${mobile({
    padding: "10px 0",
  })} */
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  ${mobile({ marginBottom: "0" })}
`;
const RemoveProduct = styled.div`
  cursor: ;
`;

const ProductAmount = styled.span`
  font-size: 24px;

  margin: 5px;

  /* ${mobile({ margin: "5px 15px " })} */
  ${mobile({ margin: "0 15px", fontSize: "30px" })}
`;
const ProductPrice = styled.span`
  font-size: 30px;
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

// const ProductSelect = styled.select``;
// const ProductOption = styled.option`

// `;
const Select = styled.select`
  padding: 10px;
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
      {/* <Navbar />
      <Announcement /> */}

      <Wrapper>
        <Title>Your Bag</Title>
        <Top>
          <Link to="/">
            <TopButton>Go back</TopButton>
          </Link>
          <TopTexts>
            <TopText>
              Shopping bag ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
              )
            </TopText>
            <TopText>Wish List (0)</TopText>
          </TopTexts>
        </Top>
        {cartItems.length === 0 ? (
          <div className="errmsg">
            <h2>
              {" "}
              Your cart is empty <Link to="/">Go back</Link>
            </h2>{" "}
          </div>
        ) : (
          <Info>
            {cartItems.map((item) => (
              <Product key={item.product}>
                <ProductDetail>
                  <Image src={item.image} />

                  <Details>
                    <ProductName>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </ProductName>

                    {/* <ProductId>
                      <b>Item Id:</b> {item._id}
                    </ProductId>
                    <ProductColor color={item.color} />

                    <ProductSize>
                      <b>Size:</b> {item.size}
                    </ProductSize> */}
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <RemoveProduct>
                    <BottomRemove
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <UilTrashAlt />
                    </BottomRemove>
                  </RemoveProduct>
                  <ProductAmountContainer>
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
                        // <option
                        //   style={{ padding: "20px" }}
                        //   key={x + 1}
                        //   value={x + 1}
                        // >
                        //   {x + 1}
                        // </option>
                      ))}
                      {/* <ProductOption>1</ProductOption> */}
                    </Select>
                  </ProductAmountContainer>
                  <ProductPrice>$ {item.price}</ProductPrice>
                </PriceDetail>
                <Hr />
              </Product>
            ))}
            <Hr />
          </Info>
        )}
        <Bottom>
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal items</SummaryItemText>
              <SummaryItemPrice>
                ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </SummaryItemPrice>
              {/* <SummaryItemPrice>$ {cart.total}</SummaryItemPrice> */}
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$0.00</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$0.00</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              {/* <SummaryItemPrice>$ {cart.total}</SummaryItemPrice> */}
              <SummaryItemPrice>
                ${" "}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </SummaryItemPrice>
            </SummaryItem>

            <Button
              type="button"
              disabled={cartItems.length === 0}
              onClick={checkOutHandler}
            >
              Checkout{" "}
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
      {/* <Newsletter /> */}
      {/* <Footer /> */}
    </Container>
  );
};

export default CartPage;
