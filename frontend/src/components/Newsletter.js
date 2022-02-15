// import { Send } from "@material-ui/icons";
import { UilMessage } from "@iconscout/react-unicons";
import styled from "styled-components";
import { mobile, desktop } from "../responsive";

const Container = styled.div`
  height: 60vh;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin: 20px;
`;
const Description = styled.p`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
  ${desktop({ width: "44rem" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
  &:focus {
    border-color: #005ad9;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* width: 100%; */
  padding: 0 30px;

  /* margin-bottom: 20px 0; */
  /* background-color: #333; */
  background-color: #005ad9;
  color: #fff;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #05c;
  }
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely updates from your favorite products.</Description>
      <InputContainer>
        <Input autoComplete="off" placeholder="Email address" />
        <Button>
          <UilMessage />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
