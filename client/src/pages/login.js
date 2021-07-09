import { Link, Redirect } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/context";
import { FormSuccess, FormError } from "../components";
import { Card, Button } from "../components/defaultComponents";
import styled from "styled-components";
import { Form, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import theme from "../Assets/theme";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { ImSpinner3 } from "react-icons/im";
import { AuthContext } from "../context/AuthContext";

const rootURL = "http://localhost:5000/api";
function Login() {
  const authContext = useContext(AuthContext);

  const { setShowNavbar, setShowHeader, setAuthenticated, setUser } =
    useContext(AppContext);
  setShowNavbar(false);
  setShowHeader(false);
  const [type, setType] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState();
  const [loginError, setLoginError] = useState();

  const schema = yup.object().shape({
    email: yup
      .string()
      .matches(
        type === "student" ? /(@stud.ase.ro)/ : /(@ie.ase.ro)/,
        "Adresă nepotrivită pentru tipul de utilizator",
        {
          excludeEmptyString: true,
        }
      )
      .email("Adresă de email invalidă")
      .required("Nicio adresă de email"),
    password: yup.string().required("Nicio parolă introdusă"),
  });

  async function login(user) {
    console.log(user);
    setIsLoading(true);
    const response = await axios({
      method: "post",
      url: `${rootURL}/auth/login`,
      data: user,
    }).catch((err) => {
      console.log(err.response.data.message);
      setLoginError(err.response.data.message);
      setLoginSuccess(null);
    });
    if (response) {
      // console.log(response.data);
      authContext.setAuthState(response.data);
      setLoginError(null);
      setLoginSuccess(response.data.message);
      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 1500);
    }

    setIsLoading(false);
  }

  function submitHandler(user) {
    console.log("submitted");
    user.type = type;
    login(user);
  }

  return (
    <>
      {redirectOnLogin && <Redirect to="/dashboard" />}
      <Wrapper>
        <FormCard>
          <Formik
            validationSchema={schema}
            // onSubmit={(values) => {
            //   alert(JSON.stringify(values, null, 2));
            // }}
            onSubmit={(values) => {
              submitHandler(values);
            }}
            initialValues={{
              email: "",
              password: "",
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group>
                  {loginSuccess && <FormSuccess text={loginSuccess} />}
                  {loginError && <FormError text={loginError} />}
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Adresă de email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Introdu email"
                    isValid={touched.email && !errors.email}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Parolă</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    value={values.password}
                    placeholder="Introdu Parola"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.password && !errors.password}
                    isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Label>Tip cont</Form.Label>
                  <Form.Control
                    as="select"
                    // name="type"
                    // value={type}
                    onChange={(e) => setType(e.target.value)}
                    // onChange={(e) => setType(e.target.value)}
                    // onBlur={handleBlur}
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Profesor</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <LoginBtn variant="primary" type="submit">
                    {isLoading ? (
                      <span className="loadingContainer">
                        <ImSpinner3 className="icon-spin"></ImSpinner3>
                        <span className="loadingText">Se încarcă...</span>
                      </span>
                    ) : (
                      <p>Login</p>
                    )}
                    <p>Login</p>
                  </LoginBtn>
                </Form.Group>

                <div class="sau">
                  <p>
                    <span>sau</span>
                  </p>
                </div>

                <Form.Group>
                  <Link to="/register" className="registerBtnContainer">
                    <RegisterBtn variant="secondary" type="submit">
                      <p>Creează un cont</p>
                    </RegisterBtn>
                  </Link>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </FormCard>
      </Wrapper>
    </>
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
  min-height 32em;

  .loadingContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    .loadingText {      
      font-family: Roboto
      margin-left: 2em;
    }

    .icon-spin {
      margin-right: 0.5em;
      -webkit-animation: icon-spin 2s infinite linear;
              animation: icon-spin 2s infinite linear;
    }
    
    @-webkit-keyframes icon-spin {
      0% {
        -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(359deg);
                transform: rotate(359deg);
      }
    }
    
    @keyframes icon-spin {
      0% {
        -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(359deg);
                transform: rotate(359deg);
      }
    }
  }

  

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
  margin-left: 0;
  margin-right: 0;
  width: 100%;
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
  margin-left: 0;
  margin-right: 0;
  width: 100%;
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
