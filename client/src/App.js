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
  Home,
  TakeTest,
  EvaluateTest,
} from "./pages";
import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import { AuthContext } from "./context/AuthContext";

const AuthenticatedRoute = (props) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      render={() =>
        auth.isAuthenticated() ? props.children : <Redirect to="/" />
      }
    ></Route>
  );
};

const StudentRoute = (props) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      render={() =>
        auth.isAuthenticated() && auth.isStudent() ? (
          props.children
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
};

const TeacherRoute = (props) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      render={() =>
        auth.isAuthenticated() && auth.isTeacher() ? (
          props.children
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
};

const UnauthenticatedRoutes = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="*">
      <Error />
    </Route>
  </Switch>
);

function App() {
  return (
    <>
      <Header></Header>
      <Navbar></Navbar>
      <Switch>
        <AuthenticatedRoute path="/dashboard">
          <Dashboard type="teacher"></Dashboard>
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/tests" exact={true}>
          <Tests></Tests>
        </AuthenticatedRoute>
        <StudentRoute path="/tests/takeTest">
          <TakeTest></TakeTest>
        </StudentRoute>
        <AuthenticatedRoute path="/history">
          <History></History>
        </AuthenticatedRoute>
        <TeacherRoute path="/addTest">
          <AddTest></AddTest>
        </TeacherRoute>
        <TeacherRoute path="/tests/evaluateTest">
          <EvaluateTest></EvaluateTest>
        </TeacherRoute>
        <AuthenticatedRoute path="/settings">
          <Settings></Settings>
        </AuthenticatedRoute>
        <UnauthenticatedRoutes />
      </Switch>
    </>
  );
}

export default App;
