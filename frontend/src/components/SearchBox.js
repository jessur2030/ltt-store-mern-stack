import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UilSearch } from "@iconscout/react-unicons";
// import SearchIcon from "@mui/icons-material/Search";

// const Wrapper = styled.div`
//   margin: 100px auto;
// `;

const InputContainer = styled.div`
  /* height: 40px; */
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid lightgray;
  border-radius: 5px;
`;

const Input = styled.input`
  margin: 0 0.5rem 0 0.5rem;
  width: 100px;
  border: none;
  outline: none;
  background: transparent;
  transition: width 0.35s ease-in-out;
  &:focus {
    width: 100%;
  }
`;

const Button = styled.button`
  /* flex: 1.3; */
  /* margin: 0 auto; */
  padding: 2px 2px;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const SearchBox = () => {
  //component state: keyword
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  //submit handler
  const submitHandler = (e) => {
    //preventDefault
    e.preventDefault();
    //check for the keyword
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <form onSubmit={submitHandler} style={{ padding: "0" }}>
      <InputContainer>
        <Input
          placeholder="Search Products..."
          type="search"
          name="q"
          id="search"
          onChange={(e) => setKeyword(e.target.value)}
        />

        <Button
          type="submit"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {" "}
          <UilSearch />
        </Button>

        {/* <button type="submit" style={{ padding: "5px", margin: "0 10px" }}>
        Search
      </button> */}
      </InputContainer>
    </form>
  );
};

export default SearchBox;
