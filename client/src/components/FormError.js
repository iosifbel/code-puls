import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import styled from "styled-components";

const FormError = ({ text }) => (
  <>
    <Wrapper>
      <FaTimesCircle></FaTimesCircle>
      <span className="ml-1">{text}</span>
    </Wrapper>
  </>
);

const Wrapper = styled.div`
  display: flex;
  min-height: 2em;
  justify-content: center;
  align-items: center;
  border: 1px solid #e53935;
  background-color: #ffcdd2;
  border-radius: 0.25rem;
  color: #f44336;

  span {
    font-family: Roboto;
    font-weight: bold;
  }
`;

export default FormError;
