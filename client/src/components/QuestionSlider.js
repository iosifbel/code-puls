import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../Assets/theme";

const QuestionSlider = (props) => {
  const [question, setQuestion] = useState(props.questions[0]);
  const [index, setIndex] = useState(1);

  function clickHandler(e) {
    const currentQuestion = props.questions[e.target.id];
    let newIndex = 1;
    try {
      newIndex = parseInt(e.target.id) + 1;
    } catch (error) {
      console.log(error);
    }

    setIndex(newIndex);
    setQuestion(currentQuestion);
    props.callback(currentQuestion);
  }

  return (
    <>
      <Wrapper index={index}>
        <ul>
          {props.questions.map((element, index) => (
            <li id={index} onClick={clickHandler}>
              {`Întrebarea ${index + 1}`}
            </li>
          ))}
        </ul>
        {question && <p>{question.descriere}</p>}
      </Wrapper>
    </>
  );
};

export default QuestionSlider;

const Wrapper = styled.div`
  li {
    font-family: "Roboto", sans-serif;
    font-weight: normal;
    color: black;
    /*  background-color: #404040; */
    float: left;
    position: relative;
    padding: 10px 20px;
    overflow: hidden;
    cursor: pointer;
  }

  li::after {
    background-color: ${theme.mainBlue};
    content: "";
    width: 0%;
    height: 3px;
    left: 0;
    bottom: 0;
    transition: width 0.35s ease 0s;
    position: absolute;
  }

  //   li:hover::after {
  //     width: 100%;
  //   }

  li:nth-child(${(props) => props.index}) {
    font-weight: bold;
    color: ${theme.mainOrange};
  }

  li:nth-child(${(props) => props.index})::after {
    width: 100%;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    margin-bottom: 5rem;
  }
`;
