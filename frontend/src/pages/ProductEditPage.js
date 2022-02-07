import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import styled from "styled-components";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { listProductsDetails, updateProduct } from "../actions/productActions";
import Message from "../components/Message";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants.js";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;

  /* width: 100%; */
  padding: 10px 18px 10px 8px;

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
`;

const ProductEditPage = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  //dispatch
  const dispatch = useDispatch();

  //user details state
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdated,
  } = productUpdate;
  //user update state
  // const userUpdate = useSelector((state) => state.userUpdate);
  // const {
  //   loading: loadingUpdate,
  //   error: errorUpdate,
  //   success: successUpdate,
  // } = userUpdate;

  useEffect(() => {
    if (successUpdated) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate(`/admin/productlist`);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductsDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setBrand(product.brand);
        setImage(product.image);
        setCountInStock(product.countInStock);
        setCategory(product.category);
      }
    }
  }, [dispatch, product, productId, successUpdated]);

  //submitHandler
  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch form field form component state
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        description,
        category,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productlist">
        <Button>
          <ChevronLeftIcon /> Go back
        </Button>
      </Link>

      <div className="form-container">
        <section className="section-form">
          <div className="form-box">
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message text={errorUpdate} />}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message text={error} />
            ) : (
              <form onSubmit={submitHandler}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  autoComplete="off"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="price">price</label>
                <input
                  autoComplete="off"
                  id="price"
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <label htmlFor="image">Image</label>
                <input
                  id="image"
                  autoComplete="off"
                  type="text"
                  placeholder="Enter image url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <label htmlFor="brand">Brand</label>
                <input
                  id="brand"
                  autoComplete="off"
                  type="text"
                  placeholder="Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
                <label htmlFor="description">Description</label>
                <textarea
                  rows="6"
                  cols="50"
                  id="description"
                  autoComplete="off"
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="isInStock">Is In Stock</label>
                <input
                  id="isInStock"
                  autoComplete="off"
                  type="number"
                  placeholder="Count In Stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  red
                />
                <label htmlFor="category">Category</label>
                <input
                  id="category"
                  autoComplete="off"
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />

                <button type="submit" className="btn-form">
                  Update
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductEditPage;
