import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { AppContext } from "../context/context";
import { Card } from "../components/defaultComponents";
import { Loader } from "./";
import {
  Route,
  Link,
  useRouteMatch,
  withRouter,
  Redirect,
} from "react-router-dom";
import theme from "../Assets/theme";
import { AuthContext } from "../context/AuthContext";
import Popup from "./Popup";

const rootURL = "http://localhost:5000/api";

const TestCard = (props) => {
  const [currentTarget, setCurrentTarget] = useState(null);
  return (
    <StyledCard graded={props.test.nota}>
      <div className="cardBanner">
        {props.test.titlu ? (
          <div>{props.test.titlu}</div>
        ) : (
          <div>Titlu test</div>
        )}
      </div>
      <div className="cardContentContainer">
        <div className="testPropsContainer">
          <div className="testPropContainer">
            <p>Materie</p>
            {props.test.materie ? (
              <div>{props.test.materie}</div>
            ) : (
              <div>-</div>
            )}
          </div>
          <div className="testPropContainer">
            <p>Intarziat</p>
            {props.test.intarziat === 0 && <div>NU</div>}
            {props.test.intarziat === 1 && <div>DA</div>}
            {props.test.intarziat === null && <div>-</div>}
          </div>
          <div className="testPropContainer">
            <p>Nota automata</p>
            {props.test.notaAutomata ? (
              <div>{props.test.notaAutomata}</div>
            ) : (
              <div>-</div>
            )}
          </div>
          <div className="testPropContainer">
            <p>Feedback</p>
            {props.test.feedback ? (
              <div
                className="feedbackStar"
                onClick={(e) => {
                  if (currentTarget === null) {
                    console.log(e.currentTarget);
                    setCurrentTarget(e.currentTarget);
                  }
                }}
              >
                <Popup
                  target={currentTarget}
                  content={props.test.feedback}
                  closeCallback={setCurrentTarget}
                />
                *
              </div>
            ) : (
              <div>-</div>
            )}
          </div>
        </div>
        <div className="gradeContainer">
          <div className="grade">
            {props.test.nota ? `Nota ${props.test.nota}` : "Nenotat"}
          </div>
        </div>
      </div>
    </StyledCard>
  );
};

function TestsGrid(props) {
  const { testInProgress, setTestInProgress } = useContext(AppContext);
  // setShowHeader(true);

  const auth = useContext(AuthContext);
  const { authState } = auth;
  const user = authState.userInfo;

  const { url } = useRouteMatch();

  // const [tests, setTests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedTest, setClickedTest] = useState();

  useEffect(() => {
    console.log(props.tests);
  }, [props.tests]);

  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <>
      <Wrapper>
        {props.tests &&
          props.tests.map((test, index) => (
            <TestCard test={test}>{test}</TestCard>
          ))}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  // height: 100vh;
  max-height: 60vh;
  width: 45vw;
  a {
    text-decoration: none;
  }
  // position: fixed;
  background: ${theme.mainGrey};
  overflow-y: auto;
  // margin-bottom: 10rem;
`;

const StyledCard = styled(Card)`
  display: flex;
  width: 40vw;
  // overflow: auto;
  // height: 10rem;
  // margin-top: 1rem;
  margin-bottom: 2rem;
  padding: 0;
  font-size: 1rem;

  .cardBanner {
    height: auto;
    text-align: center;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    font-weight: 500;
    background: ${theme.mainBlack};
    color: white;
  }

  .cardContentContainer {
    display: flex;
    flex-direction: row;
    // justify-content: space-evenly;
    // padding-bottom: 1rem;
    padding: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .testPropsContainer {
    display: flex;
    justify-content: space-between;
    width: auto;
    flex-grow: 2;
  }

  .testPropContainer {
    // margin-right: 3rem;
    text-align: center;

    .feedbackStar {
      font-size: 1.5rem;
      font-weight: 700;
      color: ${theme.mainOrange};
      cursor: pointer;
    }
  }
  .gradeContainer {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
    // margin-right: 2rem;
    // margin-left: 2rem;
  }
  .grade {
    text-align: center;
    min-width: 6rem;
    padding: 0.5rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    color: ${(props) => (props.graded ? theme.white : theme.mainOrange)};
    border: 2px solid
      ${(props) => (props.graded ? theme.mainBlue : theme.mainOrange)};
    background: ${(props) => (props.graded ? theme.mainBlue : `none`)};
    border-radius: 12px;
    align-self: flex-end;
  }
`;

export default withRouter(TestsGrid);
