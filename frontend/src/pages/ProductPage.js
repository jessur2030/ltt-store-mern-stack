import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
// import products from "../products";
import styled from "styled-components";
import { desktop, mobile, tablet } from "../responsive";
import Loader from "../components/Loader";
import { listProductsDetails } from "../actions/productActions";
import { currencyFormatter } from "../utils/utils.js";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImageContainer = styled.div`
  flex: 1;
  max-width: 780px;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "50vh" })}/* ${desktop({
    objectFit: "contain",
    height: "50vh",
    background: "Red",
  })} */
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;

  ${mobile({ padding: "10px" })}
  ${desktop({ maxWidth: "600px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;
const CountInStock = styled.p`
  font-weight: 200;
`;

const Description = styled.p`
  margin: 20px 0;
`;

const Price = styled.span`
  font-weight: 200;
  font-size: 1.5rem;
`;

const FilterContainer = styled.div`
  /* width: 50%; */
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  // margin: 10px;
`;

const FilterSize = styled.select`
  padding: 5px 20px;
  width: 120px;
  cursor: pointer;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mobile({ width: "100%" })}
`;

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

  &:disabled {
    background-color: #c5cbd5;
    color: #55555a;
    cursor: not-allowed;
  }
`;

const ReviewsContainer = styled.div`
  width: 100%;
  display: flex;
  /* align-self: flex-start;
  justify-content: center; */
`;
const ProductCountInStock = styled.span``;

const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  //read from state
  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;
  useEffect(() => {
    dispatch(listProductsDetails(id));
  }, [dispatch, id]);
  // const product = products.find((p) => p._id === id);

  const addToCartHandler = () => {
    //navigate
    //navigate(`/cart/${id}?qty=${qty}`);
    navigate(`/cart/${id}?qty=${qty}`);
  };
  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          error
        </div>
      ) : (
        <Wrapper>
          <ImageContainer>
            <Image src={product.image} />
          </ImageContainer>
          <InfoContainer>
            <Title>{product.name}</Title>
            <Description>{product.description}</Description>
            <ProductCountInStock>
              {product.countInStock > 0 ? (
                <p style={{ color: "#00B23B" }}> In stock</p>
              ) : (
                <p style={{ color: "red" }}>Sold Out</p>
              )}
            </ProductCountInStock>
            <CountInStock></CountInStock>
            <Price> {currencyFormatter.format(product.price)}</Price>
            <FilterContainer>
              {product.countInStock > 0 && (
                <Filter>
                  <FilterSize
                    as="select"
                    value={qty}
                    disabled={product.countInStock === 0}
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {" "}
                        {x + 1}
                      </option>
                    ))}
                  </FilterSize>
                </Filter>
              )}
            </FilterContainer>
            <ReviewsContainer>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ReviewsContainer>
            <AddContainer>
              <Button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                color
              >
                ADD TO CART
              </Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      )}
      {/* <Navbar />
      <Announcement /> */}

      {/* <Newsletter />
      <Footer /> */}
    </Container>
  );
};

export default ProductPage;
