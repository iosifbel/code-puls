import "./Assets/css/default.min.css";
import {
  Dashboard,
  Login,
  Register,
  Error,
  Tests,
  Settings,
  History,
} from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route path="/" exact={true}>
          <Dashboard></Dashboard>
        </Route>
        <Route path="/tests">
          <Tests></Tests>
        </Route>
        <Route path="/history">
          <History></History>
        </Route>
        <Route path="/settings">
          <Settings></Settings>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/register">
          <Register></Register>
        </Route>
        <Route path="*">
          <Error></Error>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
