import { Card, Button } from "../components/defaultComponents"
import CodeEditor from "../components/CodeEditor";
import styled from "styled-components";
import React, {useEffect, useState} from "react"
import {AppContext} from "../context/context"
import DefaultCode from "../components/defaultCodeData"


function TakeTest({test}) {  
  const {setShowNavbar} = React.useContext(AppContext);
  setShowNavbar(false);

  const {
    testQuestions, getTestQuestions, isLoading,
    aceLanguages, getJudgeAssessment, judgeResponse,
    codeEditorText, setCodeEditorText, encode    
      } = React.useContext(AppContext);  

  const [language, setLanguage] = useState("javascript")  
  const [stdout, setStdout] = useState(" ");
  const [testCaseStatus, setTestCaseStatus]=useState(" ");
  

  useEffect(() => {    
    getTestQuestions(test.id);
    const aceLanguage = aceLanguages.find((language => language.id == test.id_limbaj_programare))
    if(aceLanguage){
      setLanguage(aceLanguage.name)
    }   
    const defaultCode = DefaultCode.find((item => item.id == test.id_limbaj_programare))
    if(defaultCode) {
      setCodeEditorText(defaultCode.code);
    }
    console.log("onMount")
    
}, [])

useEffect(() => {
  console.log("judge response changed");
  if(judgeResponse) {
    setStdout(judgeResponse.stdout)
    setTestCaseStatus(judgeResponse.status.description)
  }
}, [judgeResponse])

  function executaBtnHandler() {
      console.log("buton executa apasat")
      const assignment = {
        id : test.id,
        questionId : testQuestions[0].id,
        source_cod : encode(codeEditorText),
        language_id : test.id_limbaj_programare,
        stdin : ""
      }
      console.log(assignment);
      getJudgeAssessment(assignment)
  }

  function getCodeEditorTextCallback(text) {
    // setCodeEditorText(text);    
  }






if(isLoading) {
  return ( <LoadingWrapper><div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></LoadingWrapper>)
}  
  
  return (
    <div>      
      <Wrapper>
        <ProblemCard>   
        {testQuestions.map((question) => (
          <h3>{question.descriere}</h3>
        ))}
        {/* <h3>afljad;kfljad;klfja;dkljfak;lj;lj;dsj;ldjsja afa;dfjak;ldjfakdjfkl;adsf;kladj;kjj;jdaf;fs</h3> */}
        </ProblemCard>
        <EditorCard>
          <CodeEditor language = {language}></CodeEditor>
        </EditorCard>
        <ExecuteBtn primary onClick={executaBtnHandler}>Executa</ExecuteBtn>
          <ConsoleCard>
            <div> <p>Output:</p>
            {stdout && (
              <p>{stdout}</p>
            )}
            {!stdout && (
              <p>Loading...</p>
            )}
            </div>
            <div><p>Test Case Status:</p>
            {testCaseStatus && (
              <p>{testCaseStatus}</p>
            )}
            {!testCaseStatus && (
              <p>Loading...</p>
            )}
            </div>
           
          </ConsoleCard>
        <SubmitBtn secondary>Trimite</SubmitBtn>
      </Wrapper>
    </div>
  );
}


const LoadingWrapper = styled.section `
  display: flex;
  height: 90vh;
  align-items: center;
  justify-content: center;
  
  .lds-spinner {
    color: official;
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-spinner div {
    transform-origin: 40px 40px;
    animation: lds-spinner 1.2s linear infinite;
  }
  .lds-spinner div:after {
    content: " ";
    display: block;
    position: absolute;
    top: 3px;
    left: 37px;
    width: 6px;
    height: 18px;
    border-radius: 20%;
    background: blue;
  }
  .lds-spinner div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }
  .lds-spinner div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }
  .lds-spinner div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }
  .lds-spinner div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }
  .lds-spinner div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }
  .lds-spinner div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }
  .lds-spinner div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }
  .lds-spinner div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }
  .lds-spinner div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }
  .lds-spinner div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }
  .lds-spinner div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }
  .lds-spinner div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
  @keyframes lds-spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  
  
`;
const Wrapper = styled.section`
  display: grid;
  height: 92vh;
  width: 100vw;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-template-areas:
    "A    B"
    "A    B"
    "A    B"
    "A    B"
    "A    B"
    "A    B"
    "A    D"
    "A    C"
    "A    C"
    "A    E";
  grid-column-gap: 2em;
`;
const ProblemCard = styled(Card)`
  grid-area: A;  
 
  overflow:auto;
  
  
`;
const EditorCard = styled(Card)`
  grid-area: B;
  margin-right: 2em;
  margin-top: 3em;
  align-items: streched
  justify-items : streched;
  
`;
const ConsoleCard = styled(Card)`
  grid-area: C;
  margin-right: 2em;  
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow:auto;
`;
const ExecuteBtn = styled(Button)`
  height: 50px;
  width: 150px;
  grid-are: D;
  justify-self: start;
  align-self: center;
`;
const SubmitBtn = styled(Button)`
  height: 50px;
  width: 150px;
  grid-are: E;
  justify-self: end;
  align-self: center;
  margin-right: 2em;
`;

export default TakeTest;