import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import Meta from "../components/Meta.js";
// import products from "../products";
import styled from "styled-components";
import { desktop, mobile, laptop } from "../responsive";
import Loader from "../components/Loader";
import {
  listProductsDetails,
  createProductReview,
} from "../actions/productActions";
import { currencyFormatter } from "../utils/utils.js";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants.js";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const WrapperReviews = styled.div`
  /* background-color: lightblue; */
  border: 2px solid black;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImageContainer = styled.div`
  flex: 1;
  max-width: 780px;
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1.25;
  object-fit: cover;
  /* width: 100%;
  height: 90vh;
  object-fit: cover; */
  ${laptop({ aspectRatio: "1 / 1" })}
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
  max-width: 30vh;
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
  //reviews
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  //read from productDetails state
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  //read from userLogin state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //read from productCreateReview  state
  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productCreateReview;

  useEffect(() => {
    if (successCreateReview) {
      alert("Review submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductsDetails(id));
  }, [dispatch, id, successCreateReview]);
  // const product = products.find((p) => p._id === id);

  const addToCartHandler = () => {
    //navigate
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
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
        <>
          <Meta title={product.name} />
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
          {/* TODO: Fix BUG: on state */}
          {/* TODO: Fix styles using styled-components for reviews */}
          <WrapperReviews>
            <div>
              <h1>Reviews</h1>
            </div>

            {product.reviews.length === 0 && (
              <div
                style={{ padding: "10px", borderRadius: "5px" }}
                className="status-alert"
              >
                <h3>No reviews</h3>
              </div>
            )}

            <div style={{ padding: "1rem 0" }}>
              {product.reviews.map((review) => (
                <div
                  style={{
                    padding: "1.25rem 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                  key={review._id}
                >
                  <div style={{ display: "flex" }}>
                    <strong style={{ marginRight: "10px" }}>
                      {review.name}
                    </strong>
                    <p>{review.createdAt.substring(0, 10)}</p>
                  </div>
                  <div
                  // style={{
                  //   backgroundColor: "red",
                  // }}
                  >
                    <Rating value={review.rating} />
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}

              <div style={{ marginTop: "30px" }}>
                <h2>Write a review</h2>
                {errorCreateReview && (
                  <h3 className="errmsg">{errorCreateReview}</h3>
                )}
                <div>
                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <label htmlFor="rating">Rating</label>
                      <select
                        style={{ maxWidth: "20vh", padding: "4px" }}
                        name="rating"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent </option>
                      </select>

                      <textarea
                        style={{ maxWidth: "100vh" }}
                        name="comment"
                        id="comment"
                        cols="10"
                        rows="6"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                      <Button type="submit">Submit</Button>
                    </form>
                  ) : (
                    <p style={{ fontSize: "1rem" }}>
                      Please{" "}
                      <Link
                        style={{
                          textDecoration: "#005ad9 wavy underline",
                          fontWeight: "600",
                        }}
                        to="/login"
                      >
                        sign in
                      </Link>{" "}
                      to write a review
                    </p>
                  )}
                </div>
              </div>
            </div>
          </WrapperReviews>
        </>
      )}
      {/* <Navbar />
      <Announcement /> */}

      {/* <Newsletter />
      <Footer /> */}
    </Container>
  );
};

export default ProductPage;
