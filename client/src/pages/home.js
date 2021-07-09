import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/context";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";
import { Button } from "../components/defaultComponents";

function Home() {
  const authContext = useContext(AuthContext);
  const { setShowNavbar, setShowHeader } = useContext(AppContext);
  setShowNavbar(false);
  setShowHeader(false);

  return (
    <Wrapper>
      <div>
        <h1>Home</h1>
        <Link to={authContext.isAuthenticated() ? "/dashboard" : "/login"}>
          <Button primary>Login</Button>
        </Link>
        <Link to={authContext.isAuthenticated() ? "/dashboard" : "/register"}>
          <Button secondary>Register</Button>
        </Link>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;

  h1 {
    text-align: center;
  }
`;

export default Home;
