import { useContext, useState } from "react";
import styled from "styled-components";
import theme from "../Assets/theme";
import { AppContext } from "../context";
import { QuestionSlider, CodeEditor } from "../components";
import { Card, Button } from "../components/defaultComponents";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { Form, Col } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import MuiAlert from "@material-ui/lab/Alert";

const schema = yup.object().shape({
  feedback: yup.string(),
  finalGrade: yup
    .string()
    .matches(/^([1-9]{1}(\.\d{1,2})?|10)$/, "Format acceptat: 9.97")
    .required("Nota finala trebuie compeltata"),
});

function EvaluateTest() {
  const { setShowNavbar } = useContext(AppContext);
  // const [feedback, setFeedback] = useState("");
  console.log("esti in pagina de evaluare boss");
  setShowNavbar(false);
  return (
    <Formik
      validateOnSubmit={true}
      validationSchema={schema}
      onSubmit={(values) => {
        console.log(values);
      }}
      initialValues={{
        finalGrade: "",
        feedback: "",
        automaticGrade: "2",
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
              <QuestionSlider questions={["ceva", "altceva"]}></QuestionSlider>
              <CodeEditor
                language={"javascript"}
                value={"console.log('test');"}
                defaultCode={"console.log('test');"}
                callback={() => console.log()}
              ></CodeEditor>
            </EditorCard>
            <ConsoleCard>
              <div>
                <p>Output:</p>
                {/* {!isConsoleLoading && stdout && <p>{stdout}</p>}
                {isConsoleLoading && <p>Loading...</p>} */}
              </div>
              <div>
                <p>Test Case Status:</p>
                {/* {!isConsoleLoading && testCaseStatus && <p>{testCaseStatus}</p>}
                {isConsoleLoading && <p>Loading...</p>} */}
              </div>
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
                <Form.Label column lg="auto">
                  <p>Notă finală</p>
                </Form.Label>

                <Col lg="auto">
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
                    className="position-absolute"
                  >
                    <MuiAlert severity="error" elevation={6} variant="filled">
                      <p>{errors.finalGrade}</p>
                    </MuiAlert>
                  </Form.Control.Feedback>
                </Col>

                <Form.Label column lg="auto">
                  <p>Notă automată</p>
                </Form.Label>

                <Col lg={3}>
                  <Form.Control
                    className="text-center"
                    name="automaticGrade"
                    type="text"
                    value={values.automaticGrade}
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
  p {
    margin: 0;
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
