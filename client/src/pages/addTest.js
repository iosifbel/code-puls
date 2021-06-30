import styled from "styled-components";
import { Form, Col } from "react-bootstrap";
import { AppContext } from "../context/context";
import React, { useState, useEffect } from "react";
import { Button } from "../components/defaultComponents";
import theme from "../Assets/theme";
import { Loader } from "../components";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "bootstrap/dist/css/bootstrap.min.css";

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
      <FormTitle>Adaugă Test</FormTitle>
      <Form>
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
        <Form.Group controlId="Problem">
          <Form.Label>Problemă</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            onChange={(e) => setCode(e.target.value)}
          />
        </Form.Group>
        <Form.Row>
          <Col>
            <Form.Control
              placeholder="Rezultat așteptat"
              value={expectedAnswer}
              onChange={(e) => setExpectedAnswer(e.target.value)}
            />
          </Col>
          <Col>
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
    {value}
  </div>
));

const SendBtn = styled(Button)`
  background: ${theme.mainBlue};
  color: white;
  margin-top: 2em;
  &:hover {
    background: ${theme.mainBlue};
    color: white;
    font-weight: normal;
  }
`;

const FormTitle = styled.p`
  display: flex;
  justify-content: center;
  font-size: 2em;
  margin-bottom: 2em;
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 35%;
  margin-left: 45%;
  height: 100%;
  margin-top: 5%;
`;

export default AddTest;
