import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import "./HomePage.css";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message.js";
// import products from "../products";
// import Slider from "../components/Slider";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const { keyword } = useParams();
  // const [products, setProducts] = useState([]);
  //call dispatch
  const dispatch = useDispatch();

  //useSelector
  const productList = useSelector((state) => state.productList);
  //grab what we need productList
  const { loading, error, products } = productList;

  useEffect(() => {
    //dispatch & fire off our action
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      {/* <Slider /> */}
      <h1 className="dev-mode">Currently in development</h1>
      <h2 style={{ margin: "0 0 10px 28px" }} className="">
        {" "}
        Our Favorites
      </h2>
      {loading ? (
        <Loader />
      ) : error ? (
        // <h4>{error}</h4>
        <Message text={error} />
      ) : (
        <div className="cards">
          {products.map((product) => (
            <div key={product._id}>
              <Product product={product} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default HomePage;
