import styled from "styled-components";
import React, { useContext } from "react";
import { AppContext } from "../context/context";
import { AuthContext } from "../context/AuthContext";
import { Card } from "../components/defaultComponents";
import { StudentGraph, TeacherGraph } from "../components";
import { Form } from "react-bootstrap";
import theme from "../Assets/theme";

function Dashboard(props) {
  const user = useContext(AuthContext).authState.userInfo;
  const { setShowHeader, setShowNavbar } = React.useContext(AppContext);
  setShowHeader(true);
  setShowNavbar(true);
  return (
    <Wrapper>
      <GreetingsCard>
        <h1>Buna {user.nume},</h1>
        <h2>Cum te simți astăzi?</h2>
      </GreetingsCard>
      <div className="graphCardsContainer">
        <GraphCard className="align-items-center justify-content-center">
          {/* <TeacherGraph></TeacherGraph> */}
          <StudentGraph></StudentGraph>
        </GraphCard>
        <GraphInputCard className="align-items-center justify-content-center">
          <Form.Group>
            <Form.Label>
              Alege {user.tip === "student" ? "materia" : "grupa"}
            </Form.Label>
            <Form.Control as="select" className="Forminput"></Form.Control>
          </Form.Group>
        </GraphInputCard>
      </div>
    </Wrapper>
  );
}
const GraphInputCard = styled(Card)`
  flex-grow: 1;
  // .Forminput {
  //   width: 5rem;
  // }
  padding: 5rem;
`;
const GraphCard = styled(Card)`
  flex-grow: 2;
  margin-right: 1rem;
`;
const GreetingsCard = styled(Card)`
  width: 100%;
  margin-bottom: 1rem;
  h1 {
    font-weight: normal;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-weight: normal;
    font-size: 1rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25vw;
  margin-top: 20vh;
  margin-right: 10vw;
  margin-bottom: 10vh;
  height: 53vh;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: ${theme.mainBlack};
  .graphCardsContainer {
    flex-grow: 1;
    width: 100%;
    display: flex;
    height: auto;
  }
`;

export default Dashboard;
