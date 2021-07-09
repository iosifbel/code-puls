import { Link, Redirect } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/context";
import { AuthContext } from "../context/AuthContext";
import { Card, Button } from "../components/defaultComponents";
import { FormSuccess, FormError } from "../components";
import styled from "styled-components";
import { Form, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import theme from "../Assets/theme";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { ImSpinner3 } from "react-icons/im";

const rootURL = "http://localhost:5000/api";

function Register() {
  const { setShowNavbar, setShowHeader } = useContext(AppContext);
  const authContext = useContext(AuthContext);
  setShowNavbar(false);
  setShowHeader(false);
  const [type, setType] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState();
  const [registerError, setRegisterError] = useState();
  const [redirectOnRegister, setRedirectOnRegister] = useState(false);

  const schema = yup.object().shape({
    firstName: yup.string().required("Niciun nume introdus"),
    // .matches(/^[aA-zZ\s]+$/, "Doar litere"),
    lastName: yup.string().required("Niciun nume introdus"),
    // .matches(/^[aA-zZ\s]+$/, "Doar litere"),
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

  async function register(user) {
    console.log(user);
    setIsLoading(true);
    const response = await axios({
      method: "post",
      url: `${rootURL}/auth/register`,
      data: user,
    }).catch((err) => {
      // console.log(err.response.data.message);
      setRegisterError(err.response.data.message);
      setRegisterSuccess(null);
    });
    if (response) {
      // console.log(response.data);
      authContext.setAuthState(response.data);
      setRegisterSuccess(response.data.message);
      setRegisterError(null);
      setTimeout(() => {
        setRedirectOnRegister(true);
      }, 1500);
    }
    setIsLoading(false);
  }

  function submitHandler(user) {
    console.log("submitted");
    user.type = type;
    register(user);
  }

  return (
    <>
      {redirectOnRegister && <Redirect to="/dashboard" />}
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
              firstName: "",
              lastName: "",
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
                  {registerSuccess && <FormSuccess text={registerSuccess} />}
                  {registerError && <FormError text={registerError} />}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Nume</Form.Label>
                  <Form.Control
                    name="lastName"
                    type="lastName"
                    value={values.lastName}
                    placeholder="Introdu numele"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.lastName && !errors.lastName}
                    isInvalid={touched.lastName && !!errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Prenume</Form.Label>
                  <Form.Control
                    name="firstName"
                    type="firstName"
                    value={values.firstName}
                    placeholder="Introdu prenumele"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.firstName && !errors.firstName}
                    isInvalid={touched.firstName && !!errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
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
                  <LoginBtn variant="secondary" type="submit">
                    {isLoading ? (
                      <span className="loadingContainer">
                        <ImSpinner3 className="icon-spin"></ImSpinner3>
                        <span className="loadingText">Se încarcă...</span>
                      </span>
                    ) : (
                      <p>Creează cont</p>
                    )}
                  </LoginBtn>
                </Form.Group>

                <Form.Group className="alreadyHaveContainer">
                  <p>Ai deja un cont?</p>
                  <Link to="/login" className="loginText">
                    Login
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


 .alreadyHaveContainer {
   font-size: 0.9rem;
   color: ${theme.Grey1};   
  font-style: normal;
  font-weight: bold;
   background: white;
   display: flex;
   direction: row;

   .loginText{
     margin-left: 0.5em;
     font-weight: normal;
   }
   
 }

`;

const LoginBtn = styled(Button)`
  background: ${theme.mainOrange};
  color: white;
  margin: 0;
  margin-top: 2em;
  font-size: 1rem;
  font-weight: bold;
  height: 2em;
  width: 20em;
  width: 100%;
  border: none;

  &:hover {
    background: ${theme.mainOrange};
    color: white;
  }
`;

export default Register;
