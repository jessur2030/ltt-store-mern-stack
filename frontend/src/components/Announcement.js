import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  /* background-color: teal; */
  background-color: #005ad9;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font: 14px;
  font-weight: 700;
`;

const CloseBtn = styled.button`
  color: white;
  border: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
`;

const Announcement = () => {
  return (
    <Container>
      <p>
        Due to a large volume of requests, our support team may take longer than
        normal to reply. we appreciate your patience.
      </p>
    </Container>
  );
};

export default Announcement;
