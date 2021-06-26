import { useState } from "react";
import {Route, Switch, withRouter} from "react-router-dom"
import {TakeTest} from "."
import TestsGrid from "../components/testsGrid";

function Tests() {
  const [testId, setTestId] = useState(0);

  const handleCallback = (childData) =>{
    console.log("Test")
    setTestId(childData)
    console.log(childData)
}

  return (
    <Switch>
    <Route path="/tests/takeTest" render ={props => (<TakeTest {...props} testId={testId}/>)}/>
    <Route path="/tests" render ={props => (<TestsGrid {...props} parentCallBack={handleCallback}/>)} />  
  </Switch>  
  );
}


export default withRouter(Tests);
