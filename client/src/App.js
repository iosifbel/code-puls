import "./Assets/css/default.min.css";
import {
  Dashboard,
  Login,
  Register,
  Error,
  Tests,
  Settings,
  History,
  AddTest,
} from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Router>
        <Header></Header>
        <Navbar type="teacher"></Navbar>
        <Switch>
          <Route path="/" exact={true}>
            <Dashboard type="teacher"></Dashboard>
          </Route>
          <Route path="/tests">
            <Tests></Tests>
          </Route>
          <Route path="/history">
            <History></History>
          </Route>
          <Route path="/addTest">
            <AddTest></AddTest>
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
    </div>
  );
}

export default App;
