// import { Send } from "@material-ui/icons";
import { UilMessage } from "@iconscout/react-unicons";
import styled from "styled-components";
import { mobile, desktop } from "../responsive";

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
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
`;

const Button = styled.button`
  flex: 1.3;
  align-items: center;
  border: none;

  background-color: #fcf5f5;
  cursor: pointer;
  transition: 60ms ease-in-out;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely updates from your favorite products.</Description>
      <InputContainer>
        <Input placeholder="Email address" />
        <Button>
          <UilMessage />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
