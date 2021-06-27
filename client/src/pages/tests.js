import { useState } from "react";
import {Route, Switch, withRouter} from "react-router-dom"
import {TakeTest} from "."
import TestsGrid from "../components/testsGrid";

function Tests() {
  const [test, setTest] = useState({});

  const handleCallback = (childData) =>{ 
    console.log(childData)   
    setTest(childData)    
}

  return (
    <Switch>
    <Route path="/tests/takeTest" render ={props => (<TakeTest {...props} test={test}/>)}/>
    <Route path="/tests" render ={props => (<TestsGrid {...props} parentCallBack={handleCallback}/>)} />  
  </Switch>  
  );
}


export default withRouter(Tests);
