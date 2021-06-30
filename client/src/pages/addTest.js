import styled from "styled-components";
import { Form, Col } from "react-bootstrap";
import { AppContext } from "../context/context";
import React, { useState, useEffect } from "react";
import { Button, Card } from "../components/defaultComponents";
import theme from "../Assets/theme";
import { Loader } from "../components";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdAddCircleOutline } from "react-icons/md";

const rootURL = "http://localhost:5000/api";

function AddTest() {
  const { judge0Languges, isLoading, setIsLoading } =
    React.useContext(AppContext);
  const [subjects, setSubjects] = useState([]);
  const [groups, setGroups] = useState();
  const [areGroupsLoading, setAreGroupsLoading] = useState(true);

  //form controlled input fields
  const [selectedSubject, setSelectedSubject] = useState(-1);
  const [selectedGroup, setSelectedGroup] = useState();
  const [language, setLanguage] = useState(judge0Languges[0].id);
  const [code, setCode] = useState();
  const [expectedAnswer, setExpectedAnswer] = useState("");
  const [date, setDate] = useState(new Date());
  const [questions, setQuestions] = useState([{ id: 1, questionBody: "" }]);

  //onMount
  useEffect(() => {
    getSubjects();
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

  async function getSubjects() {
    console.log("getting subjects from db...");
    setIsLoading(true);
    const response = await axios({
      method: "get",
      url: `${rootURL}/teachers/1/subjects`,
    }).catch((err) => console.log(err));

    if (response) {
      console.log(response.data);
      setSubjects(response.data);
    }
    setIsLoading(false);
  }

  //   async function postTest(test) {
  //     console.log("posting assignment...");
  //     setIsLoading(true);

  //     console.log(test.source_cod)
  //     const response  = await axios({
  //         method : "post",
  //         url : `${rootURL}/questions/assess/${test.questionId}/${test.id}/1`,
  //         data: judgeData
  //     })
  //     .catch((err) => console.log(err));

  //     if(response) {
  //         console.log(response.data)
  //         setJudgeResponse(response.data);
  //     }
  //     setIsLoading(false);
  // }

  function addQuestionBtnHandler(e) {
    console.log("addQuestionBtnHandler");
    const question = { id: 2, questionBody: "" };
    setQuestions((questions) => questions.concat(question));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const test = {
      selectedSubject,
      selectedGroup,
      language,
      code,
      expectedAnswer,
      date,
    };
    //   const test = {
    //     titlu : title,
    //     deadline : date,
    //     id_materie : test.id_materie,
    //     id_limbaj_programare: test.id_limbaj_programare,
    //     grupa: test.grupa,
    // }
  }

  if (isLoading) {
    console.log("is loading..");
    return <Loader></Loader>;
  }

  return (
    <Wrapper>
      <FormTitle className="formTitle">Adaugă Test</FormTitle>
      <Form className="addTestForm">
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

        <Form.Group controlId="programmingLanguages">
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
        {questions.map((question) => (
          <Form.Row className="questionRow">
            <Form.Group as={Col} controlId="Problem">
              <Form.Label>Problema {question.id}</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                onChange={(e) => setCode(e.target.value)}
              />
            </Form.Group>
            <Col>
              <Form.Label>Rezultat așteptat</Form.Label>
              <Form.Control
                value={expectedAnswer}
                onChange={(e) => setExpectedAnswer(e.target.value)}
              />
            </Col>
            <MdAddCircleOutline
              className="addQuestionBtn"
              onClick={addQuestionBtnHandler}
            ></MdAddCircleOutline>
          </Form.Row>
        ))}
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
              dateFormat="MMMM d, yyyy h:mm aa"
              fixedHeight
              popperPlacement="top-end"
            />
          </Col>
        </Form.Row>

        <Form.Row className="justify-content-center">
          <SendBtn primary onClick={(e) => handleSubmit(e)}>
            Trimite
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
  font-weight: 400;
  height: 50px;
  width: 150px;

  &:hover {
    background: ${theme.mainBlue};
    color: white;
    font-weight: normal;
    f
  }
`;

const FormTitle = styled.p`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 2em;
`;

const Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-left: 37%;
  height: 100%;
  margin-top: 3%;
  padding-left: 5%;
  padding-right: 5%;

  .addQuestionBtn {
    align-self: center;
    margin-top: 15px;
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
