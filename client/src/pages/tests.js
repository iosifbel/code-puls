import { useContext, useEffect, useState } from "react";

import {
  Route,
  Switch,
  withRouter,
  Redirect,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import { TakeTest, EvaluateTest } from ".";
import { TestsTable, Loader, AlertBar } from "../components/";
import { AppContext, AuthContext, utils } from "../context";

const rootURL = utils.rootURL;

function Tests() {
  const user = useContext(AuthContext).authState.userInfo;
  const { judge0Languges, setShowNavbar } = useContext(AppContext);
  setShowNavbar(true);

  const history = useHistory();
  const [tests, setTests] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [redirectPath] = useState(() => {
    return user.tip === "student" ? "tests/takeTest" : "tests/evaluateTest";
  });
  const { testState, setTestInProgress } = useContext(AppContext);
  const [alert, setAlert] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleCallback = (childData) => {
    const clickedTestId = parseInt(childData);
    if (user.tip === "student") {
      if (testState.id < 0 || testState.id === clickedTestId) {
        const clickedTest = tests.find((item) => item.id === clickedTestId);
        // console.log(clickedTestId);
        setTestInProgress(clickedTest);
        setRedirect(true);
        history.push(redirectPath);
      } else {
        console.log("test already in progress..");
        setAlert({
          open: true,
          severity: "warning",
          message: `${testState.titlu} deja deschis!`,
        });
      }
    } else {
      setRedirect(true);
      history.push(redirectPath);
    }
  };

  useEffect(() => {
    getTests(user, setIsLoading, setTests, judge0Languges);
    console.log(tests);
  }, []);

  return (
    <>
      {redirect && <Redirect to={redirectPath} />}
      {isLoading ? (
        <Loader></Loader>
      ) : (
        // <Switch>
        //   <Route path={`/tests/takeTest`}>
        //     <TakeTest></TakeTest>
        //   </Route>
        //   <Route path={`/tests/evaluateTest`}>
        //     <EvaluateTest></EvaluateTest>
        //   </Route>

        //   <Route
        //     path="/tests"
        //     exact={true}
        //     render={(props) => (
        //       <TestsTable
        //         title="Teste Programate"
        //         data={tests}
        //         callback={handleCallback}
        //         redirectPath={redirectPath}
        //       ></TestsTable>
        //     )}
        //   />
        // </Switch>
        <>
          {!redirect && (
            <AlertBar
              open={alert.open}
              severity={alert.severity}
              message={alert.message}
            />
          )}
          <TestsTable
            title={
              user.tip === "student" ? "Teste programate" : "Teste de corectat"
            }
            data={tests}
            callback={handleCallback}
            redirectPath={redirectPath}
          ></TestsTable>
        </>
      )}
    </>
  );
}

const getTests = async (user, setIsLoading, setTests, languages) => {
  console.log("getting tests from db..");
  let url = `${rootURL}`;
  if (user.tip === "student") {
    url += `/students/${user.id}/due`;
  } else {
    url += `/teachers/${user.id}/ungradedSubmissions`;
  }

  setIsLoading(true);
  const response = await axios.get(url).catch((err) => console.log(err));

  if (response) {
    const tests = response.data;
    processTests(tests, languages);
    setTests(tests);
  }
  setIsLoading(false);
};

const processTests = (tests, languages) => {
  tests.forEach((item) => {
    if (item.deadline !== null) {
      item.deadline = parseDateTime(item.deadline);
    }
    if (item.id_limbaj_programare !== null) {
      item.limbaj = getLanguage(item.id_limbaj_programare, languages);
    }
  });
};

const parseDateTime = (datetime) => {
  try {
    const date = new Date(datetime);
    // console.log(date.getTime());
    return (
      date.toLocaleDateString("ro-RO") +
      ", ora " +
      date.getHours() +
      ":" +
      date.getMinutes()
    );
  } catch (error) {
    console.log(error);
  }
};

const getLanguage = (languageId, languages) => {
  const language = languages.find((item) => item.id === languageId);
  const regexToRemoveParanthesis = / *\([^)]*\) */g;

  return language.name.replace(regexToRemoveParanthesis, "");
};

export default withRouter(Tests);
