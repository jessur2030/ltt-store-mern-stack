import {
  EmailOutlined,
  Facebook,
  Instagram,
  PhoneOutlined,
  RoomOutlined,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";

//TODO: fix footer height
const FooterContainer = styled.footer`
  /* position: relative;
  min-height: 100%; */
  margin-top: 10rem;
`;

const Container = styled.div`
  display: flex;
  /* align-items: center;
  justify-content: center; */
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const Logo = styled.h1``;

const Description = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Left>
          <Logo>LTT Store</Logo>
          <Description>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            blanditiis veniam, sunt officia, rem modi quod impedit eligendi
            inventore repellendus reiciendis minima esse culpa iste porro
            voluptatum saepe itaque quis.
          </Description>
          <SocialContainer>
            <SocialIcon color="E60023">
              <YouTube />
            </SocialIcon>
            <SocialIcon color="1a91da">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="f7367d">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="1877f2">
              <Facebook />
            </SocialIcon>
          </SocialContainer>
        </Left>

        <Center>
          <Title>Info</Title>
          <List>
            <ListItem>Shipping Policy</ListItem>
            <ListItem>Return Policy</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Terms and Conditions</ListItem>
            <ListItem>Privacy Policy</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <RoomOutlined style={{ marginRight: "10px" }} /> 1125 Park avenue
            Miami, FL 32878
          </ContactItem>
          <ContactItem>
            <PhoneOutlined style={{ marginRight: "10px" }} /> (305) 987-3311
          </ContactItem>
          <ContactItem>
            <EmailOutlined style={{ marginRight: "10px" }} /> contact@jrdev.io
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
