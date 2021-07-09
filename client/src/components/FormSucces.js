import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import styled from "styled-components";

const FormSuccess = ({ text }) => (
  <Wrapper>
    <FaCheckCircle></FaCheckCircle>
    <span className="ml-1">{text}</span>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  min-height: 2em;
  justify-content: center;
  align-items: center;
  border: 1px solid #43a047;
  background-color: #c8e6c9;
  border-radius: 0.25rem;
  color: #388e3c;

  span {
    font-family: Roboto;
    font-weight: bold;
  }
`;
export default FormSuccess;
