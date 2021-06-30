import React, { useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "../context/context";
import { Card } from "../components/defaultComponents";
import { Route, Link, useRouteMatch, withRouter } from "react-router-dom";
import theme from "../Assets/theme";

function TestsGrid(props) {
  const { tests, isLoading, getStudentTests, setShowHeader } =
    React.useContext(AppContext);
  const { url } = useRouteMatch();
  setShowHeader(false);
  useEffect(() => {
    getStudentTests();
    console.log(tests);
  }, []);

  const testClicked = (e) => {
    console.log("clicked card with id " + e.target.id);
    const clickedTest = tests.find((test) => test.id == e.target.id);
    props.parentCallBack(clickedTest);
    // e.preventDefault();
  };

  if (isLoading) {
    return (
      <Wrapper>
        {" "}
        <div>
          <h1>Tests are loading..</h1>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {" "}
      {/* <div> */}
      {/* <h1>Test programate</h1> */}
      {/* <TestsContainer> */}
      {tests.map((test) => (
        <div key={test.id}>
          <Link to={`${url}/takeTest`} onClick={testClicked}>
            <StyledCard id={test.id}>{test.titlu}</StyledCard>
          </Link>
        </div>
      ))}
      {/* </TestsContainer> */}
      {/* </div> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
  a {
    text-decoration: none;
  }
  position: fixed;
  // // align-items: center;
  // // justify-content: center;
  // font-size: 1rem;
  background: ${theme.mainGrey};
  margin-left: 30%;
  margin-top: 10em;
  overflow-y: auto;
`;

const TestsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 1rem;
`;

const StyledCard = styled(Card)`
  // width: 20vw;
  margin-top: 1%;
  margin-bottom: 1%;
`;

export default withRouter(TestsGrid);
