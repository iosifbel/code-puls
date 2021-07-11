import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { AppContext } from "../context/context";
import { Card } from "../components/defaultComponents";
import {
  Route,
  Link,
  useRouteMatch,
  withRouter,
  Redirect,
} from "react-router-dom";
import theme from "../Assets/theme";
import { AuthContext } from "../context/AuthContext";

const rootURL = "http://localhost:5000/api";

function TestsGrid(props) {
  const { setShowHeader } = React.useContext(AppContext);
  setShowHeader(true);

  const auth = useContext(AuthContext);
  const { authState } = auth;
  const user = authState.userInfo;

  const { url } = useRouteMatch();

  const [tests, setTests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedTest, setClickedTest] = useState();

  useEffect(() => {
    getStudentTests(user);
  }, []);

  useEffect(() => {
    console.log(tests);
  }, [tests]);

  const getStudentTests = async (user) => {
    console.log("getting tests from db..");
    setIsLoading(true);
    const response = await axios
      .get(`${rootURL}/students/${user.id}/due`)
      .catch((err) => console.log(err));

    if (response) {
      setTests(response.data);
    }
    setIsLoading(false);
  };

  const testClicked = (e) => {
    console.log("clicked card with id " + e.target.id);
    const clickedTest = tests.find((test) => test.id == e.target.id);
    props.parentCallBack(clickedTest);
    setClickedTest(clickedTest);
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
    <>
      {clickedTest && <Redirect to={`${url}/takeTest`} />}
      <Wrapper>
        {tests.map((test) => (
          <div key={test.id}>
            {/* <Link to={`${url}/takeTest`} onClick={testClicked}> */}
            <StyledCard id={test.id} onClick={testClicked}>
              {test.titlu}
            </StyledCard>
            {/* </Link> */}
          </div>
        ))}
      </Wrapper>
    </>
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

export default TestsGrid;
