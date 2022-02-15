import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Meta from "../components/Meta.js";
import Product from "../components/Product";
import "./HomePage.css";
import { listProducts, listTopRatedProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message.js";
import { useParams, Link } from "react-router-dom";
// import Slider from "../components/Slider";
import styled from "styled-components";
// import Paginate from "../components/Paginate.js";
import Newsletter from "../components/Newsletter.js";

const Button = styled.button`
  padding: 10px;
  margin: 20px 0;
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

const HomePage = () => {
  const { keyword } = useParams();

  const { pageNumber } = useParams() || 1;

  // const [products, setProducts] = useState([]);
  //call dispatch
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const {
    loading: loadingTopRated,
    error: errorTopRated,
    products: productsTopRated,
  } = productTopRated;

  //useSelector
  const productList = useSelector((state) => state.productList);
  //grab what we need productList
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    //dispatch & fire off our action
    dispatch(listProducts(keyword, pageNumber));
    dispatch(listTopRatedProducts());
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {/* {!keyword && <Slider />} */}
      {keyword ? (
        <Link to="/">
          <Button>Go Back</Button>
        </Link>
      ) : (
        ""
      )}

      <h1
        style={{ display: "flex", justifyContent: "center", margin: "30px 0" }}
        className=""
      >
        {" "}
        Our Favorites
      </h1>
      {loadingTopRated ? (
        <Loader />
      ) : errorTopRated ? (
        <Message text={errorTopRated} />
      ) : (
        <>
          <div className="cards-top-rated">
            {productsTopRated.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        </>
      )}

      <h1
        style={{ display: "flex", justifyContent: "center", margin: "30px 0" }}
        className=""
      >
        {" "}
        All products
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        // <h4>{error}</h4>
        <Message text={error} />
      ) : (
        <>
          <div className="cards">
            {products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>

          {/* <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          /> */}
        </>
      )}

      <Newsletter />
    </>
  );
};

export default HomePage;
