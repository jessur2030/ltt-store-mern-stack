import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { listOrders } from "../actions/orderActions.js";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import Loader from "../components/Loader.js";
// import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
// import Message from "../components/Message.js";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px " })}
`;
const TopContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.p`
  font-size: 1.85rem;
  font-weight: 500;
  ${mobile({ fontSize: "1.70rem" })}
`;
const TableContainer = styled.div`
  display: flex;
  overflow-x: auto;

  margin-top: 20px;
`;

const RemoveProduct = styled.p`
  cursor: pointer;
  color: #006aff;
  &:hover {
    color: #4a95ff;
  }
`;

const OrderListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get order list from state
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  console.log(orders);
  const userLogin = useSelector((state) => state.userLogin);
  //get userInfo from state
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate(`/login`);
    }
  }, [dispatch, userInfo, navigate]);

  return (
    <Container>
      <Wrapper>
        <TopContainer>
          <Title>Orders</Title>
        </TopContainer>
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
                  <th>user</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <ClearIcon style={{ color: "firebrick" }} />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <ClearIcon style={{ color: "firebrick" }} />
                      )}
                    </td>

                    <td>
                      <Link to={`/order/${order._id}`}>
                        <RemoveProduct>Details</RemoveProduct>
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

export default OrderListPage;
