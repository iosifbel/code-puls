import styled from "styled-components";
import { Form, Col } from "react-bootstrap";
import { FormSuccess, FormError } from "../components";
import { AppContext } from "../context/context";
import { AuthContext } from "../context/AuthContext";
import React, { useState, useEffect, useContext } from "react";
import { Button, Card } from "../components/defaultComponents";
import theme from "../Assets/theme";
import { Loader } from "../components";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { ImSpinner3 } from "react-icons/im";

const rootURL = "http://localhost:5000/api";

function AddTest() {
  const auth = useContext(AuthContext);
  const { authState } = auth;
  const user = authState.userInfo;

  const { judge0Languges, setShowHeader } = React.useContext(AppContext);
  setShowHeader(true);

  //set success error messages
  const [formSuccess, setFormSuccess] = useState();
  const [formError, setFormError] = useState();

  //set static components on load
  const [isLoading, setIsLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [groups, setGroups] = useState();
  const [areGroupsLoading, setAreGroupsLoading] = useState(true);

  //form controlled input fields
  const [selectedSubject, setSelectedSubject] = useState(-1);
  const [selectedGroup, setSelectedGroup] = useState();
  const [language, setLanguage] = useState(judge0Languges[0].id);
  const [code, setCode] = useState();
  const [title, setTitle] = useState();
  const [expectedAnswer, setExpectedAnswer] = useState("");
  const [date, setDate] = useState(new Date());
  const [questions, setQuestions] = useState([
    { id: 0, questionBody: "", expectedAnswer: "" },
  ]);
  // const [expectedAnswers, setExpectedAnswers] = useState([])

  //onMount
  useEffect(() => {
    getSubjects(user);
  }, []);

  function subjectChanged(id) {
    setSelectedSubject(id);
    if (id > 0) {
      getGroups(id);
    }
  }
  async function getGroups(subjectId) {
    console.log("getting groups from db...");
    setAreGroupsLoading(true);
    const response = await axios({
      method: "get",
      url: `${rootURL}/subjects/${subjectId}/groups`,
    }).catch((err) => console.log(err));

    if (response) {
      console.log(response.data);
      setGroups(response.data);
      setSelectedGroup(response.data[0].grupa);
    }
    setAreGroupsLoading(false);
  }

  async function getSubjects(user) {
    console.log("getting subjects from db...");
    setIsLoading(true);
    const response = await axios({
      method: "get",
      url: `${rootURL}/teachers/${user.id}/subjects`,
    }).catch((err) => console.log(err));

    if (response) {
      console.log(response.data);
      setSubjects(response.data);
    }
    setIsLoading(false);
  }

  function addQuestionBtnHandler(e) {
    console.log("addQuestionBtnHandler");

    const lastQuestion = questions[questions.length - 1];

    setQuestions((questions) =>
      questions.concat({
        id: lastQuestion.id + 1,
        questionBody: "",
        expectedAnswer: "",
      })
    );
  }
  function removeQuestionBtnHandler(e) {
    console.log("removeQuestionBtnHandler");
    const lastQuestion = questions[questions.length - 1];
    setQuestions((items) =>
      items.filter((item) => {
        return item.id !== lastQuestion.id;
      })
    );
  }
  function handleQuestionsChange(e, index) {
    // 1. Make a shallow copy of the array
    console.log(index);
    let temp_state = [...questions];

    // 2. Make a shallow copy of the element you want to mutate
    let temp_element = { ...questions.find((x) => x.id === index) };

    // 3. Update the property you're interested in
    temp_element.questionBody = e.target.value;

    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    temp_state[index] = temp_element;

    // 5. Set the state to our new copy
    setQuestions(temp_state);
    // console.log(questions.find((x) => x.id === index).questionBody);
  }

  function handleExpectedResultChange(e, index) {
    // 1. Make a shallow copy of the array
    console.log(index);
    let temp_state = [...questions];

    // 2. Make a shallow copy of the element you want to mutate
    let temp_element = { ...questions.find((x) => x.id === index) };

    // 3. Update the property you're interested in
    temp_element.expectedAnswer = e.target.value;

    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    temp_state[index] = temp_element;

    // 5. Set the state to our new copy
    setQuestions(temp_state);
    // console.log(questions.find((x) => x.id === index).questionBody);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const test = {
      title: title,
      deadline: date,
      subjectId: selectedSubject,
      languageId: language,
      questions: questions,
      group: selectedGroup,
    };
    console.log(test);
    postTest(test);
    console.log(date.getTimezoneOffset());
  }

  async function postTest(test) {
    console.log("posting assignment...");
    setIsLoading(true);

    const response = await axios({
      method: "post",
      url: `${rootURL}/assignments/create`,
      data: test,
    }).catch((err) => {
      console.log(err.response.data.message);
      setFormError(err.response.data.message);
      setTimeout(() => {
        setFormError(null);
      }, 3000);
      setFormSuccess(null);
    });

    if (response) {
      console.log(response.data);
      setFormError(null);
      setFormSuccess(response.data.message);
      setTimeout(() => {
        setFormSuccess(null);
      }, 5000);
    }
    setIsLoading(false);
  }

  return (
    <Wrapper>
      <FormTitle className="formTitle">Adaugă Test</FormTitle>
      <Form.Group>
        {formSuccess && <FormSuccess text={formSuccess} />}
        {formError && <FormError text={formError} />}
      </Form.Group>
      <Form className="addTestForm">
        <Form.Row>
          <Form.Group as={Col} controlId="testTitle">
            <Form.Label>Titlu test</Form.Label>
            <Form.Control onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group as={Col} controlId="programmingLanguages">
            <Form.Label>Limbaj de programare</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setLanguage(e.target.value)}
            >
              {judge0Languges.map((language) => (
                <option value={language.id} key={language.id}>
                  {language.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="subjects">
            <Form.Label>Materie</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => subjectChanged(e.target.value)}
            >
              <option value={-1}>Selectează</option>
              {subjects.map((subject) => (
                <option value={subject.id} id={subject.id}>
                  {subject.descriere}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="StudentGroups">
            <Form.Label>Grupa</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              {areGroupsLoading && selectedSubject == -1 && (
                <option value={-1}>nicio grupa pentru materia selectată</option>
              )}
              {!areGroupsLoading &&
                groups &&
                selectedSubject > 0 &&
                groups.map((item) => (
                  <option value={item.grupa}>{item.grupa}</option>
                ))}
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <div className="questionsContainer">
          {questions.map((question, index) => (
            <Form.Row className="questionRow">
              <Form.Group as={Col} controlId="Problem">
                <Form.Label>Problema {question.id}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  // value={questions.find((x) => x.id === index).questionBody}
                  onChange={(e) => handleQuestionsChange(e, index)}
                />
              </Form.Group>
              <Col>
                <Form.Label>Rezultat așteptat</Form.Label>
                <Form.Control
                  // value={questions.find((x) => x.id === index).expectedAnswer}
                  onChange={(e) => handleExpectedResultChange(e, index)}
                />
              </Col>
              {!questions[index + 1] && index !== 0 ? (
                <MdRemoveCircleOutline
                  className="addQuestionBtn"
                  onClick={removeQuestionBtnHandler}
                ></MdRemoveCircleOutline>
              ) : (
                <MdAddCircleOutline
                  className="addQuestionBtn"
                  onClick={addQuestionBtnHandler}
                ></MdAddCircleOutline>
              )}
            </Form.Row>
          ))}
        </div>
        <Form.Row>
          <Col className="datePickerColumn">
            <DatePicker
              wrapperClassName="datepicker"
              customInput={<ExampleCustomInput />}
              selected={date}
              onChange={(date) => setDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Timp"
              dateFormat="d MMMM, yyyy HH:mm"
              fixedHeight
              popperPlacement="top-end"
            />
          </Col>
        </Form.Row>

        <Form.Row className="justify-content-center">
          <SendBtn primary onClick={(e) => handleSubmit(e)}>
            {isLoading ? (
              <span className="loadingContainer">
                <ImSpinner3 className="icon-spin"></ImSpinner3>
                <span className="loadingText">Se încarcă...</span>
              </span>
            ) : (
              <p>Trimite</p>
            )}
            {/* <p>Trimite</p> */}
          </SendBtn>
        </Form.Row>
      </Form>
    </Wrapper>
  );
}

const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <div className="timePickerBox" onClick={onClick} ref={ref}>
    <div className="deadlineText">{`Deadline:`}</div>
    {value}
  </div>
));

const SendBtn = styled(Button)`
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

  }
  p {
    margin-bottom: 0;
  }
`;

const FormTitle = styled.p`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 1em;
`;

const Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin-left: 37%;
  height: 100%;

  margin-top: 7%;
  // padding-left: 5%;
  // padding-right: 5%;
  // padding-bottom: 10%;
  // padding-top: 5%;

  .addTestForm {
    height: 100%;
    width: 100%;
  }
  .plus {
    margin-right: 10px;
  }
  .questionsContainer {
    max-height: 12em;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .addQuestionBtn {
    align-self: center;
    margin-top: 15px;
    margin-right: 15px;
    margin-left: 15px;
    cursor: pointer;
  }

  .datePickerColumn {
    display: flex;
    justify-content: center;
  }

  .timePickerBox {
    display: flex;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .deadlineText {
    margin-right: 10px;
    font-weight: 600;
  }
`;

export default AddTest;
