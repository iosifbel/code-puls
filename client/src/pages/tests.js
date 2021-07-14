import { useContext, useEffect, useState } from "react";
import {
  Route,
  Switch,
  withRouter,
  Redirect,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import { TakeTest } from ".";
import { TestsGrid, TestsTable, Loader } from "../components/";
import { AppContext, AuthContext, utils } from "../context";

const rootURL = utils.rootURL;

function Tests() {
  const user = useContext(AuthContext).authState.userInfo;

  // const { authState } = auth;
  // const user = authState.userInfo;
  const [tests, setTests] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [redirectToTakeTest, setRedirectToTakeTest] = useState(false);
  const { path } = useRouteMatch();
  const { testState, setTestInProgress } = useContext(AppContext);

  // const { setShowNavbar } = useContext(AppContext);
  // setShowNavbar(false);

  const handleCallback = (childData) => {
    const clickedTestId = parseInt(childData);
    const clickedTest = tests.find((item) => item.id === clickedTestId);
    // console.log(clickedTest);
    setTestInProgress(clickedTest);
    setRedirectToTakeTest(true);
  };

  useEffect(() => {
    getStudentDueTests(user, setIsLoading, setTests);
  }, []);

  useEffect(() => {
    console.log(tests);
  }, [tests]);

  return (
    <>
      {redirectToTakeTest && <Redirect to="tests/takeTest" />}
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <Switch>
          <Route path={`/tests/takeTest`}>
            <TakeTest></TakeTest>
          </Route>

          <Route
            path="/tests"
            // exact={true}
            render={(props) => (
              <TestsTable
                title="Teste Programate"
                data={tests}
                callback={handleCallback}
              ></TestsTable>
            )}
          />
        </Switch>
      )}
    </>
  );
}

const getStudentDueTests = async (user, setIsLoading, setTests) => {
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

export default Tests;
