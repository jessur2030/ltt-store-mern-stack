// import React from "react";
// import { Link, useParams } from "react-router-dom";
// import Rating from "../components/Rating";
// import products from "../products";
// import styled from "styled-components";
// import { mobile } from "../responsive";

// const Container = styled.div``;

// const Wrapper = styled.div`
//   padding: 20px;
//   ${mobile({ padding: "10px " })}
// `;
// const Title = styled.h1`
//   font-weight: 300;
//   text-align: center;
// `;

// const Top = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 20px;
//   ${mobile({ padding: "10px 0" })}
// `;

// const TopButton = styled.button`
//   width: 11rem;
//   padding: 10px;
//   font-weight: 600;
//   cursor: pointer;
//   border: ${(props) => props.type === "filled" && "none"};
//   background-color: ${(props) =>
//     props.type === "filled" ? "#333" : "transparent"};
//   color: ${(props) => props.type === "filled" && "#fff"};
//   ${mobile({ width: "10rem" })}
// `;

// const TopTexts = styled.div`
//   ${mobile({ display: "none" })}
// `;

// const TopText = styled.span`
//   text-decoration: underline;
//   /* cursor: pointer; */
//   margin: 0 10px;
// `;

// const Bottom = styled.div`
//   /* cursor: pointer; */
//   display: flex;
//   justify-content: space-between;
//   ${mobile({ flexDirection: "column" })}
// `;

// const Info = styled.div`
//   flex: 3;
// `;

// const Product = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-top: 20px;
//   ${mobile({ flexDirection: "column" })}
// `;

// const ProductDetail = styled.div`
//   flex: 2;
//   display: flex;
// `;

// const Image = styled.img`
//   width: 200px;
// `;

// const Details = styled.div`
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
// `;

// const ProductName = styled.span``;

// const ProductId = styled.span``;

// const ProductColor = styled.div`
//   width: 30px;
//   height: 30px;
//   border-radius: 50%;
//   background-color: ${(props) => props.color};
//   /* cursor: pointer; */
// `;

// const ProductSize = styled.div``;

// const Hr = styled.hr`
//   background-color: #eeee;
//   border: none;
//   height: 1px;
// `;

// const PriceDetail = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   ${mobile({
//     flexDirection: "row-reverse",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "10px 0",
//   })}/* ${mobile({
//     padding: "10px 0",
//   })} */
// `;

// const ProductAmountContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 20px;
//   ${mobile({ marginBottom: "0" })}
// `;
// const ProductAmount = styled.span`
//   font-size: 24px;

//   margin: 5px;

//   /* ${mobile({ margin: "5px 15px " })} */
//   ${mobile({ margin: "0 15px", fontSize: "30px" })}
// `;
// const ProductPrice = styled.span`
//   font-size: 30px;
//   font-weight: 200;
// `;

// const Summary = styled.div`
//   flex: 1;
//   border: 0.5px solid lightgray;
//   border-radius: 10px;
//   padding: 20px;
//   height: 70%;
//   /* height: 22rem; */
// `;

// const SummaryTitle = styled.h1`
//   font-weight: 200;
// `;

// const SummaryItem = styled.div`
//   display: flex;
//   margin: 30px 0px;
//   justify-content: space-between;
//   font-weight: ${(props) => props.type === "total" && "500"};
//   font-size: ${(props) => props.type === "total" && "20 px"};
// `;

// const SummaryItemText = styled.span``;

// const SummaryItemPrice = styled.span``;

// const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 20px 0;
//   background-color: #333;
//   color: #fff;
//   font-weight: 600;
//   border: none;

//   cursor: pointer;
// `;

// const ProductPage = () => {
//   const { id } = useParams();

//   const product = products.find((p) => p._id === id);

//   return (
//     <Container>
//       <Wrapper>
//         <Title>Your cart</Title>
//         <Top>
//           <Link to="/">
//             <TopButton>Go back </TopButton>
//           </Link>
//           {/* <TopTexts>
//             <TopText>Shopping bag (2)</TopText>
//             <TopText>Wish List (0)</TopText>
//           </TopTexts> */}
//           <TopButton type="filled">CHECKOUT NOW</TopButton>
//         </Top>
//         <Bottom>
//           <Info>
//             {/* {cart.products.map((product) => ( */}
//             <Product>
//               <ProductDetail>
//                 <Image src={product.image} />

//                 <Details>
//                   <ProductName>
//                     <b>Product:</b> {product.name}
//                   </ProductName>

//                   <ProductId>
//                     <b>Item Id:</b> {product._id}
//                   </ProductId>
//                   {/* <ProductColor color={product.color} /> */}

//                   <ProductSize>
//                     <b>Size:</b> m
//                   </ProductSize>
//                 </Details>
//               </ProductDetail>
//               <PriceDetail>
//                 <ProductAmountContainer>
//                   {/* <Remove
//                   style={{ cursor: "pointer" }}
//                   onClick={() => handleQuantity("dec")}
//                   /> */}
//                   <ProductAmount>{product.price}</ProductAmount>
//                   {/* <Add
//                   style={{ cursor: "pointer" }}
//                   onClick={() => handleQuantity("inc")}
//                   /> */}
//                 </ProductAmountContainer>
//                 <ProductPrice>$ {[product.price]}</ProductPrice>
//               </PriceDetail>
//             </Product>
//             {/* ))} */}
//             <Hr />
//           </Info>
//           <Summary>
//             <SummaryTitle>Order Summary</SummaryTitle>
//             <SummaryItem>
//               <SummaryItemText>Subtotal</SummaryItemText>
//               <SummaryItemPrice>$ 21421</SummaryItemPrice>
//             </SummaryItem>
//             <SummaryItem>
//               <SummaryItemText>Estimated Shipping</SummaryItemText>
//               <SummaryItemPrice>$ 5.90</SummaryItemPrice>
//             </SummaryItem>
//             <SummaryItem>
//               <SummaryItemText>Shipping Discount</SummaryItemText>
//               <SummaryItemPrice>$ -5.90</SummaryItemPrice>
//             </SummaryItem>
//             <SummaryItem type="total">
//               <SummaryItemText>Total</SummaryItemText>
//               <SummaryItemPrice>$ 213123</SummaryItemPrice>
//             </SummaryItem>

//             <Button>Checkout </Button>
//           </Summary>
//         </Bottom>
//       </Wrapper>
//     </Container>
//   );
// };

// export default ProductPage;
