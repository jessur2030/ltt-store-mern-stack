import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { listUsers } from "../actions/userActions.js";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import Loader from "../components/Loader.js";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";

import { deleteUser } from "../actions/userActions.js";
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

const Title = styled.h1`
  font-weight: 200;
`;

const TableContainer = styled.div`
  display: flex;
  /* background-color: coral; */
  /* justify-content: space-between; */
  margin-top: 20px;
  /* margin-right: 20px; */
  /* box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.15); */

  ${tablet({ flexDirection: "column", overflowX: "auto" })}
  ${mobile({ flexDirection: "column", overflowX: "auto" })}
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
`;
// e8e8e8

const UserListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //get user list from state
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  //get userInfo from state
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  //get userInfo from state
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate(`/login`);
    }
  }, [dispatch, userInfo, navigate, successDelete]);

  //delete handler function
  const deleteHandler = (id) => {
    if (window.confirm(`Are you sure?`)) {
      //dispatch delete action
      dispatch(deleteUser(id));
    }
  };

  //create users handler
  const createUserHandler = (user) => {
    //create user
  };
  return (
    <Container>
      <Wrapper>
        <TopContainer>
          <Title>Users</Title>
          <Button onClick={createUserHandler}>
            {" "}
            <AddIcon /> Create user
          </Button>
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
                  <th>name</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <CheckIcon
                          style={{
                            color: "#388e3c",
                          }}
                        />
                      ) : (
                        <ClearIcon style={{ color: "#c62828" }} />
                      )}
                    </td>
                    <td>
                      <RemoveProduct onClick={() => deleteHandler(user._id)}>
                        Remove
                      </RemoveProduct>
                    </td>
                    <td>
                      <Link to={`/admin/user/${user._id}/edit`}>
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

export default UserListPage;
