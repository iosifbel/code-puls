import { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../context";

function EvaluateTest() {
  const { setShowNavbar } = useContext(AppContext);
  console.log("esti in pagina de evaluare boss");
  setShowNavbar(false);
  return (
    <Wrapper>
      {" "}
      <div>
        <h1>Corecteaza test</h1>
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

export default EvaluateTest;
