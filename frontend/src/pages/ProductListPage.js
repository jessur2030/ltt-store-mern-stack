import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import Loader from "../components/Loader.js";
import AddIcon from "@mui/icons-material/Add";
// import { deleteUser } from "../actions/userActions.js";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions.js";
import { currencyFormatter } from "../utils/utils";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import Message from "../components/Message";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px " })}
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 1.85rem;
  font-weight: 500;
  ${mobile({ fontSize: "1.70rem" })}
`;

const TableContainer = styled.div`
  display: flex;
  overflow-x: auto;
  /* background-color: coral; */
  /* justify-content: space-between; */
  margin-top: 20px;
  /* margin-right: 20px; */
  /* box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.15); */

  /* ${tablet({ flexDirection: "column" })}
  ${mobile({ flexDirection: "column" })} */
`;

const RemoveProduct = styled.p`
  cursor: pointer;
  color: #006aff;
  &:hover {
    color: #4a95ff;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 100%; */
  padding: 10px 15px 10px 8px;
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
// e8e8e8

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get user list from state
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  //get userInfo from state
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  //get userInfo from state
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    //dispatch reset
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate(`/login`);
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    userInfo,
    navigate,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  //delete handler function
  const deleteHandler = (id) => {
    if (window.confirm(`Are you sure?`)) {
      dispatch(deleteProduct(id));
      //dispatch delete action
      //   dispatch(deleteUser(id));
      //DISPATCH DELETE PRODUCT
    }
  };

  const createProductHandler = () => {
    // dispatch Create product action
    dispatch(createProduct());
  };
  return (
    <Container>
      <Wrapper>
        <TopContainer>
          <Title>Products</Title>
          <Button onClick={createProductHandler}>
            {" "}
            <AddIcon /> Create product
          </Button>
        </TopContainer>
        {loadingDelete && <Loader />}
        {errorDelete && <Message text={errorDelete} />}
        {loadingCreate && <Loader />}
        {errorCreate && <Message text={errorCreate} />}
        <TableContainer>
          {loading ? (
            <Loader />
          ) : error ? (
            <h2 className="status status-danger">{error}</h2>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>name</th>
                  <th>price</th>
                  <th>category</th>
                  <th>brand</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{currencyFormatter.format(product.price)}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>

                    <td>
                      <RemoveProduct onClick={() => deleteHandler(product._id)}>
                        Remove
                      </RemoveProduct>
                    </td>
                    <td>
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <RemoveProduct>Edit</RemoveProduct>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </TableContainer>
      </Wrapper>
    </Container>
  );
};

export default ProductListPage;
