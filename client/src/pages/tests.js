import { useContext, useEffect, useState } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { TakeTest } from ".";
import TestsGrid from "../components/testsGrid";
import { AppContext } from "../context/context";

function Tests() {
  const [test, setTest] = useState();
  // const {setShowNavbar} = useContext(AppContext)
  // setShowNavbar(true);

  const handleCallback = (childData) => {
    // console.log(childData);
    setTest(childData);
  };

  return (
    <>
      <Switch>
        {test && (
          <Route
            path="/tests/takeTest"
            render={(props) => <TakeTest {...props} test={test} />}
          />
        )}
        <Route
          path="/tests"
          render={(props) => (
            <TestsGrid {...props} parentCallBack={handleCallback} />
          )}
        />
      </Switch>
    </>
  );
}

export default Tests;
