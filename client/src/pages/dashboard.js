import styled from "styled-components";
import React, { useContext } from "react";
import { AppContext } from "../context/context";
import { AuthContext } from "../context/AuthContext";

function Dashboard(props) {
  const auth = useContext(AuthContext);
  const { authState } = auth;
  const { setShowHeader, setShowNavbar } = React.useContext(AppContext);
  setShowHeader(true);
  setShowNavbar(true);
  return (
    <Wrapper>
      {" "}
      <div>
        <h1>Panou de lucru</h1>
        <h2>{authState.userInfo ? authState.userInfo.tip : "none"}</h2>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 90vh;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

export default Dashboard;
