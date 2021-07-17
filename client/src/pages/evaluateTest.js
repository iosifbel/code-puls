import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../Assets/theme";
import { AppContext } from "../context";
import { QuestionSlider, CodeEditor, AlertBar } from "../components";
import { Card, Button } from "../components/defaultComponents";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { Form, Col } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import MuiAlert from "@material-ui/lab/Alert";
import axios, { handleAxiosError, handleUnexpectedError } from "axios";
import { utils } from "../context";

const schema = yup.object().shape({
  feedback: yup.string(),
  finalGrade: yup
    .string()
    .matches(/^([1-9]{1}(\.\d{1,2})?|10)$/, "Format acceptat: 9.97")
    .required("Nota finală trebuie completată"),
});

const processData = (data) => {
  try {
    let { incercare, evaluareAutomata } = data;
    data.incercare = JSON.parse(incercare);
    data.evaluareAutomata = JSON.parse(evaluareAutomata);
    const submission = [];
    data.incercare.forEach((item, index) => {
      submission.push({
        // questionBody: data.questions[index],
        questionCode: item,
        assessment: data.evaluareAutomata[index],
      });
    });
    return submission;
  } catch (error) {
    console.log(error);
  }
};

const getSubmission = async (
  student_id,
  test_id,
  setSubmission,
  setQuestions,
  setIsLoading,
  setAutomaticGrade,
  setLateStatus
) => {
  try {
    setIsLoading(true);
    const { data } = await axios.get(
      `${utils.rootURL}/grades/submission/${test_id}/${student_id}`
    );

    const submission = processData(data);

    setSubmission(submission);
    setQuestions(data.questions);
  } catch (error) {
    console.log(error);
  }
  setIsLoading(false);
};

const gradeSubmission = async (
  submission,
  test_id,
  student_id,
  setIsLoading,
  removeTestInProgress,
  setAlert
) => {
  try {
    setIsLoading(true);
    const response = await axios({
      method: "put",
      url: `${utils.rootURL}/grades/grade/${test_id}/${student_id}`,
      data: submission,
    });

    console.log(response);

    if (response.status === 200) {
      setAlert({
        open: true,
        severity: "success",
        message: response.data.message,
      });
      // console.log("ceva");
      removeTestInProgress();
    } else {
      setAlert({
        open: true,
        severity: "warning",
        message: response.data.message,
      });
    }
  } catch (error) {
    console.log(error);
  }
  setIsLoading(false);
};

function EvaluateTest() {
  const { setShowNavbar, testState, removeTestInProgress } =
    useContext(AppContext);
  const [submission, setSubmission] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [automaticGrade, setAutomaticGrade] = useState();
  const [lateStatus, setLateStatus] = useState();
  const [currentQuestion, setCurrentQuestion] = useState({
    questionCode: "",
    assessment: {
      stdout: "",
      status: { id: "", description: "" },
    },
    compile_output: "",
  });
  const [alert, setAlert] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  useEffect(() => {
    console.log("esti in pagina de evaluare boss");

    if (testState.id) {
      console.log("getting submission..");
      getSubmission(
        testState.id,
        testState.id_test,
        setSubmission,
        setQuestions,
        setIsLoading,
        setAutomaticGrade,
        setLateStatus
      );
      setAutomaticGrade(testState.notaAutomata);
      setLateStatus(testState.intarziat === 1 ? "da" : "nu");
    }
  }, []);

  useEffect(() => {
    if (submission) {
      console.log(submission);
      setCurrentQuestion(submission[0]);
    }
  }, [submission]);

  const sliderHandler = (question, index) => {
    setCurrentQuestion(submission[index]);
  };

  setShowNavbar(false);
  return (
    <>
      <AlertBar
        open={alert.open}
        severity={alert.severity}
        message={alert.message}
      />
      <Formik
        validateOnSubmit={true}
        validationSchema={schema}
        onSubmit={(values) => {
          const { finalGrade, feedback } = values;
          const data = { finalGrade, feedback };
          console.log(data);
          gradeSubmission(
            data,
            testState.id_test,
            testState.id,
            setIsSubmitLoading,
            removeTestInProgress,
            setAlert
          );
        }}
        initialValues={{
          finalGrade: "",
          feedback: "",
          automaticGrade: automaticGrade,
          late: lateStatus,
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
            <Wrapper>
              <EditorCard>
                <QuestionSlider
                  questions={questions}
                  callback={sliderHandler}
                ></QuestionSlider>
                <CodeEditor
                  language={"javascript"}
                  value={currentQuestion.questionCode}
                  callback={() => {}}
                ></CodeEditor>
              </EditorCard>
              <ConsoleCard>
                <div>
                  <p>Output:</p>
                  {/* {!isConsoleLoading && stdout && <p>{stdout}</p>}
                {isConsoleLoading && <p>Loading...</p>} */}
                  {currentQuestion.assessment.stdout && (
                    <p>{currentQuestion.assessment.stdout}</p>
                  )}
                </div>
                <div>
                  <p>Test Case Status:</p>
                  {/* {!isConsoleLoading && testCaseStatus && <p>{testCaseStatus}</p>}
                {isConsoleLoading && <p>Loading...</p>} */}
                  {currentQuestion.assessment.status.description && (
                    <p>{currentQuestion.assessment.status.description}</p>
                  )}
                </div>
                {currentQuestion.assessment.compileError && (
                  <div>
                    <div>
                      <p>Compile Error:</p>
                    </div>
                    <p>{currentQuestion.assessment.compileError}</p>
                  </div>
                )}
              </ConsoleCard>

              <FeedbackCard>
                <Banner>
                  <h2>Comentarii și feedback</h2>
                </Banner>
                <TextArea
                  rows="20"
                  name="feedback"
                  value={values.feedback}
                  onChange={handleChange}
                ></TextArea>
              </FeedbackCard>
              <GradeCard>
                <Form.Row className="justify-content-around align-items-center">
                  <Form.Label column lg="auto" className="mr-2">
                    <div>Notă finală</div>
                  </Form.Label>

                  <Col className="mr-2" lg="auto">
                    <Form.Control
                      className="text-center"
                      name="finalGrade"
                      type="text"
                      value={values.finalGrade}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Introdu nota"
                      isValid={touched.finalGrade && !errors.finalGrade}
                      isInvalid={touched.finalGrade && !!errors.finalGrade}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="position-absolute feedback"
                    >
                      <MuiAlert severity="error" elevation={6} variant="filled">
                        <p>{errors.finalGrade}</p>
                      </MuiAlert>
                    </Form.Control.Feedback>
                  </Col>

                  <Form.Label column lg="auto">
                    <div>Notă automată</div>
                  </Form.Label>

                  <Col className="mr-2">
                    <Form.Control
                      className="text-center"
                      name="automaticGrade"
                      type="text"
                      value={automaticGrade}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      readOnly
                    />
                  </Col>
                  <Form.Label column lg="auto">
                    <div>Intarziat</div>
                  </Form.Label>

                  <Col>
                    <Form.Control
                      className="text-center"
                      name="late"
                      type="text"
                      value={lateStatus}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      readOnly
                    />
                  </Col>
                </Form.Row>
              </GradeCard>
              <SubmitBtn>
                <p>Trimite</p>
              </SubmitBtn>
            </Wrapper>
          </Form>
        )}
      </Formik>
    </>
  );
}

const EditorCard = styled(Card)`
  grid-area: A;
  margin-left: 1em;
  overflow: auto;
`;

const ConsoleCard = styled(Card)`
  grid-area: B;
  margin-left: 1em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: auto;
  flex-wrap: wrap;
`;

const FeedbackCard = styled(Card)`
  grid-area: C;
  margin-right: 1em;
  margin-bottom: 1rem;
  padding: 0;
`;

const Banner = styled.div`
  padding: 0.7rem;
  padding-left: 1.5rem;
  background-color: ${theme.Grey1};
  color: ${theme.mainBlack};
  h2 {
    margin: 0;
    font-size: 1.3rem;
  }
`;

const TextArea = styled.textarea`
  padding: 2rem;
  border: none;
  resize: none;
  outline: none;
  height:100%
  color: ${theme.mainBlack};
  border-radius: 0 0 10px 10px;
  font-size: 1rem;
`;

const SubmitBtn = styled(Button)`
  grid-area: E;
  display: flex;
  justify-content: center;
  align-self: end;
  justify-self: end;
  width: 5rem;
  height: 3rem;

  margin-bottom: 0.5em;
`;

const GradeCard = styled(Card)`
  grid-area: D;
  display: flex;
  justify-content: center;
  margin-right: 1em;
  background-color: ${theme.Grey1};
  // p {
  //   margin: 0;
  // }
  div {
    font-size: 1rem;
  }
  .feedback {
    width: auto;
  }
`;

const Wrapper = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  margin-top: 1.5rem;
  max-height: calc(93vh - 1.5rem);

  font-size: 3rem;

  p {
    font-size: 1rem;
  }

  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-template-areas:
    "A    C"
    "A    C"
    "A    C"
    "A    C"
    "A    C"
    "A    C"
    "A    D"
    "B    E"
    "B    E"
    "B    E";
  grid-column-gap: 1em;
`;

export default EvaluateTest;
