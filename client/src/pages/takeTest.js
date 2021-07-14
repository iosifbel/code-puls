import { Card, Button } from "../components/defaultComponents";
import { CodeEditor, Loader, QuestionSlider, AlertBar } from "../components";
import styled from "styled-components";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AppContext } from "../context/context";
import DefaultCode from "../components/defaultCodeData";
import axios from "axios";

const rootURL = "http://localhost:5000/api";

function TakeTest() {
  // console.log("salut");
  const { setShowNavbar, setShowHeader } = useContext(AppContext);
  setShowNavbar(false);
  setShowHeader(true);

  //get current User
  const auth = useContext(AuthContext);
  const { authState } = auth;
  const user = authState.userInfo;

  //get current test
  const [test, setTest] = useState();

  const {
    testState,
    testQuestions,
    getTestQuestions,
    isLoading,
    aceLanguages,
    encode,
    decode,
    removeTestInProgress,
  } = React.useContext(AppContext);

  const [language, setLanguage] = useState("javascript");
  const [stdout, setStdout] = useState(" ");
  const [compileError, setCompileError] = useState();
  const [testCaseStatus, setTestCaseStatus] = useState(" ");
  const [judgeResponse, setJudgeResponse] = useState();
  const [isConsoleLoading, setIsConsoleLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [codeEditorText, setCodeEditorText] = useState([]);
  const [currentCodeEditorText, setCurrentCodeEditorText] = useState();
  const [alert, setAlert] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  //onMount
  useEffect(() => {
    // console.log(testState);
    setTest(testState);
    // console.log("onMount");
    // console.log(test.id);
  }, []);
  useEffect(() => {
    if (test) {
      getTestQuestions(test.id);
      // console.log(testQuestions);
      const aceLanguage = aceLanguages.find(
        (language) => language.id == test.id_limbaj_programare
      );
      if (aceLanguage) {
        setLanguage(aceLanguage.name);
      }
    }
  }, [test]);

  useEffect(() => {
    setCurrentQuestion(testQuestions[0]);
  }, [testQuestions]);

  //Initialize codeEditor with default code
  useEffect(
    () => {
      if (testQuestions && test) {
        const defaultCode = DefaultCode.find(
          (item) => item.id == test.id_limbaj_programare
        );
        if (defaultCode) {
          let array = [];
          testQuestions.map((element) => {
            array.push(defaultCode.code);
          });
          setCodeEditorText(array);
        }
      }
    },
    [testQuestions],
    [test]
  );

  //When judgeResponse change
  useEffect(() => {
    if (judgeResponse) {
      console.log("judge response changed");
      setStdout(decode(judgeResponse.stdout));
      setTestCaseStatus(judgeResponse.status.description);
      setCompileError(decode(judgeResponse.compile_output));
    }
  }, [judgeResponse]);

  function questionChanged(question, index) {
    // console.log(testQuestions);
    // console.log(question);
    setCurrentQuestionIndex(index);
    setCurrentQuestion(question);
  }
  function codeEditorTextChanged(text) {
    console.log(text);

    let temp_state = [...codeEditorText];

    if (codeEditorText.length > currentQuestionIndex) {
      temp_state[currentQuestionIndex] = text;
    } else {
      temp_state.push(text);
    }
    setCodeEditorText(temp_state);
    setCurrentCodeEditorText(text);
  }

  const getJudgeAssessment = async (test) => {
    console.log("getting assessment from judge...");
    setIsConsoleLoading(true);
    const judgeData = {
      source_code: test.source_code,
      language_id: test.language_id,
      stdin: test.stdin,
    };
    // console.log(test.source_cod);
    const response = await axios({
      method: "post",
      url: `${rootURL}/questions/assess/${test.questionId}/${test.id}/${user.id}`,
      data: judgeData,
    }).catch((err) => console.log(err));

    if (response) {
      console.log(response.data);
      setJudgeResponse(response.data);
    }
    setIsConsoleLoading(false);
  };
  function executaBtnHandler() {
    if (!isConsoleLoading) {
      console.log("buton executa apasat");
      const question = {
        id: test.id,
        questionId: currentQuestion.id,
        source_code: encode(codeEditorText[currentQuestionIndex]),
        language_id: test.id_limbaj_programare,
        stdin: "",
      };
      console.log(question);
      getJudgeAssessment(question);
    }
  }
  function handleSendBtn() {
    if (!isSubmitLoading) {
      const submission = {
        test_id: test.id,
        language_id: test.id_limbaj_programare,
        stdin: "",
        questions: [],
      };

      codeEditorText.forEach((code, index) => {
        const question = {
          questionId: testQuestions[index].id,
          source_code: encode(code),
        };
        submission.questions.push(question);
      });
      // console.log(submission);
      postSubmission(submission);
    }
  }

  async function postSubmission(submission) {
    // console.log(test.id);
    setIsSubmitLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: `${rootURL}/assignments/sendSubmission/${user.id}/${submission.test_id}`,
        data: submission,
      });
      if (response) {
        // console.log(response.data);
        if (response.status === 200) {
          setAlert({
            open: true,
            severity: "success",
            message: response.data.message,
          });
          console.log("ceva");
          removeTestInProgress();
        } else {
          setAlert({
            open: true,
            severity: "warning",
            message: response.data.message,
          });
        }
      }
      setIsSubmitLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setAlert({
        open: true,
        severity: "error",
        message: error.response.data.message,
      });
    }
  }
  // useEffect(() => {
  //   console.log(codeEditorText);
  // }, [codeEditorText]);

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <Wrapper>
        <AlertBar
          open={alert.open}
          severity={alert.severity}
          message={alert.message}
        />
        <ProblemCard>
          <QuestionSlider
            questions={testQuestions}
            callback={questionChanged}
          ></QuestionSlider>
        </ProblemCard>
        <EditorCard>
          <CodeEditor
            language={language}
            value={codeEditorText[currentQuestionIndex]}
            defaultCode={currentCodeEditorText}
            callback={codeEditorTextChanged}
          ></CodeEditor>
        </EditorCard>
        <ExecuteBtn primary onClick={executaBtnHandler}>
          Executa
        </ExecuteBtn>
        <ConsoleCard>
          <div>
            {" "}
            <p>Output:</p>
            {!isConsoleLoading && stdout && <p>{stdout}</p>}
            {isConsoleLoading && <p>Loading...</p>}
          </div>
          <div>
            <p>Test Case Status:</p>
            {!isConsoleLoading && testCaseStatus && <p>{testCaseStatus}</p>}
            {isConsoleLoading && <p>Loading...</p>}
          </div>
          {!isConsoleLoading && compileError && (
            <div>
              <div>
                <p>Compile Error:</p>
              </div>
              <p>{compileError}</p>
            </div>
          )}
        </ConsoleCard>
        <SubmitBtn secondary onClick={handleSendBtn}>
          {isSubmitLoading ? <div>Loading...</div> : <div>Trimite</div>}
        </SubmitBtn>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.section`
  display: grid;
  height: 100%;
  width: 100%;
  max-height: 700px;
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
  overflow: auto;
  margin-left: 2em;
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
  overflow: auto;
  flex-wrap: wrap;
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
