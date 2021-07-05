import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { AppContext } from "../context/context";
import { Card, Button } from "../components/defaultComponents";
import styled from "styled-components";
import { Form, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import theme from "../Assets/theme";

function Login() {
  const { setShowNavbar, setShowHeader } = React.useContext(AppContext);
  setShowNavbar(false);
  setShowHeader(false);

  return (
    <Wrapper>
      <FormCard>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Adresă de email</Form.Label>
            <Form.Control type="email" placeholder="Introdu email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Parolă</Form.Label>
            <Form.Control type="password" placeholder="Introdu Parola" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Label>Tip cont</Form.Label>
            <Form.Control as="select">
              <option>Student</option>
              <option>Profesor</option>
            </Form.Control>
          </Form.Group>
          <Form.Row className="justify-content-center">
            <Link to="/" className="loginLink">
              <LoginBtn variant="primary" type="submit">
                <p>Login</p>
              </LoginBtn>
            </Link>
          </Form.Row>

          <div class="sau">
            <p>
              <span>sau</span>
            </p>
          </div>

          <Form.Row className="justify-content-center">
            <RegisterBtn variant="secondary" type="submit">
              Register
            </RegisterBtn>
          </Form.Row>
        </Form>
        {/* <h1>Login Page</h1>
        <Link to="/" className="btn">
          Login
        </Link>
        <Link to="/register" className="btn">
          Creează cont
        </Link> */}
      </FormCard>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  // .loginLink {
  //   text-decoration: none;
  // }
  a {
    text-decoration: none;
  }
`;

const FormCard = styled(Card)`
  width: 30em;
  height 32em;

  .sau {
    margin-top: 2em;
    margin-bottom: 1em;
    p {
      
      
      width: 100%; 
      text-align: center; 
      border-bottom: 1px solid ${theme.Grey2}; 
      line-height: 0.1em;
      margin: 10px 0 20px; 
      
   } 
   
   p span { 
       background:#fff; 
       padding:0 10px; 
       font-weight: bold;
       color: ${theme.Grey1}
   }
  }

`;

const LoginBtn = styled(Button)`
  background: ${theme.mainBlue};
  color: white;
  margin-top: 2em;
  font-size: 1rem;
  font-weight: bold;
  height: 2em;
  width: 20em;
  border: none;

  &:hover {
    background: ${theme.mainBlue};
    color: white;
  }
`;

const RegisterBtn = styled(Button)`
  background: white;
  color: ${theme.mainBlue};
  margin-top: 2em;
  font-size: 1rem;
  font-weight: bold;
  height: 2em;
  width: 20em;
  border: 1px solid ${theme.Grey1};
  box-sizing: border-box;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
  border-radius: 5px;

  &:hover {
    background: white;
    color: ${theme.mainBlue};
  }
`;

export default Login;
