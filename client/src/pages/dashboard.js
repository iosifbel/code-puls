import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/context";
import { AuthContext } from "../context/AuthContext";
import { Card } from "../components/defaultComponents";
import { StudentGraph, TeacherGraph } from "../components";
import { Form } from "react-bootstrap";
import theme from "../Assets/theme";
import axios from "axios";
import { utils } from "../context";
import { dataGenerator } from "../components/TeacherGraphGenerator";

function Dashboard(props) {
  const user = useContext(AuthContext).authState.userInfo;
  const { setShowHeader, setShowNavbar } = React.useContext(AppContext);
  setShowHeader(true);
  setShowNavbar(true);

  const [scatterDemoData, setScatterDemoData] = useState([]);
  const [data, setData] = useState();
  const [subjectOptions, setSubjectOptions] = useState();
  const [selectedSubject, setSelectedSubject] = useState({ id: -1, text: "" });
  const [selectedGroup, setSelectedGroup] = useState();
  const [groupsOptions, setGroupsOptions] = useState();
  const [studentGraphData, setStudentGraphData] = useState();
  const [scatterData, setScatterData] = useState([]);

  useEffect(() => {
    getSubjectOptions();
    if (user.tip === "profesor") {
      setScatterData(dataGenerator(30));
    }
  }, []);

  useEffect(() => {
    if (user.tip === "profesor") {
      if (selectedSubject && selectedGroup) {
        getScatterplotGrades(selectedSubject.id, selectedGroup);
      }
    } else if (user.tip === "student") {
      if (selectedSubject) {
        console.log(selectedSubject);
      }
    }
  }, [selectedSubject, selectedGroup]);

  //   useEffect(()=> {
  // if(studentGraphData) {

  // }
  //   }, [studentGraphData(])

  // useEffect(() => {
  //   if (subjectOptions) {
  //     console.log(subjectOptions);
  //   }
  // }, [subjectOptions]);

  function subjectHandler(id) {
    try {
      const subjectId = parseInt(id);
      if (subjectId !== -1) {
        const selectedSubject = subjectOptions.find(
          (item) => item.id === subjectId
        );
        setSelectedSubject(selectedSubject);

        if (user.tip === "profesor") {
          getGroupsOptions(selectedSubject.id);
        } else if (user.tip === "student") {
          getSubjectTests(selectedSubject.id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  function groupsHandler(groupId) {
    if (groupId !== "-1") {
      setSelectedGroup(groupId);
    }
  }

  const getScatterplotGrades = async (subjectId, group) => {
    try {
      const url = `${utils.rootURL}/grades/scatterplot/${subjectId}/${group}`;
      const { data } = await axios.get(url);

      console.log(data);
      const freqMap = buildFrequencyMap(data);
      setScatterData(freqMap);
      console.log(freqMap);
    } catch (error) {
      console.log(error);
    }
  };

  const buildFrequencyMap = (array) => {
    const map = {};
    array.forEach((item) => {
      if (map[item]) {
        map[item]++;
      } else {
        map[item] = 1;
      }
    });

    const data = [];
    Object.keys(map).forEach((item) => {
      data.push({ val: parseInt(item), arg: map[item] });
    });
    // console.log(obj);
    return data;
  };

  const getSubjectTests = async (subjectId) => {
    const tests = [];
    try {
      const url = `${utils.rootURL}/students/${user.id}/grades/${subjectId}`;
      const { data } = await axios.get(url);
      if (data) {
        data.forEach((item) => {
          const date = new Date(item.deadline);
          item.date = `${date.getDate()}/${parseInt(date.getMonth()) + 1}`;
          item.grade = item.nota;
          tests.push(item);
        });
      }
      setStudentGraphData(tests);
    } catch (error) {
      console.log(error);
    }
  };

  const getGroupsOptions = async (subjectId) => {
    try {
      const url = `${utils.rootURL}/subjects/${subjectId}/groups`;

      const { data } = await axios.get(url);
      // console.log(url);

      const options = [];
      // console.log(data);

      data.forEach((item) => {
        options.push(item.grupa);
      });
      setGroupsOptions(options);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubjectOptions = async () => {
    try {
      if (user) {
        let url = `${utils.rootURL}`;

        if (user.tip === "student") {
          url += `/students/${user.id}/subjects`;
        } else if (user.tip === "profesor") {
          url += `/teachers/${user.id}/subjects`;
        }

        const { data } = await axios.get(url);
        // setData(data);
        // console.log(data);

        const subjectOptions = [];

        data.forEach((item) => {
          subjectOptions.push({ id: item.id, text: item.descriere });
        });
        setSubjectOptions(subjectOptions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <GreetingsCard>
        <h1>Buna {user.nume},</h1>
        <h2>Cum te simți astăzi?</h2>
      </GreetingsCard>
      <div className="graphCardsContainer">
        <GraphCard className="align-items-center justify-content-center">
          {user.tip === "student" ? (
            <StudentGraph
              subject={selectedSubject.text}
              data={studentGraphData}
            ></StudentGraph>
          ) : (
            <TeacherGraph
              subject={selectedSubject.text}
              group={selectedGroup}
              data={scatterData}
            ></TeacherGraph>
          )}
        </GraphCard>
        <GraphInputCard className="align-items-center justify-content-center">
          <div className="formTitle">Alege setarile graficului</div>
          <Form.Group>
            {/* <Form.Label>Alege materia</Form.Label> */}
            <Form.Control
              as="select"
              className="Forminput"
              onChange={(e) => subjectHandler(e.target.value)}
            >
              <option key={-1} value={-1}>
                Selectează materia
              </option>
              {subjectOptions &&
                subjectOptions.length > 0 &&
                subjectOptions.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.text}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
          {user.tip === "profesor" && (
            <Form.Group>
              {/* <Form.Label>Alege grupa</Form.Label> */}
              <Form.Control
                as="select"
                className="Forminput"
                onChange={(e) => groupsHandler(e.target.value)}
              >
                <option key={-1} value={-1}>
                  Selectează grupa
                </option>
                {groupsOptions &&
                  groupsOptions.length > 0 &&
                  groupsOptions.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
          )}
        </GraphInputCard>
      </div>
    </Wrapper>
  );
}
const GraphInputCard = styled(Card)`
  flex-grow: 1;
  // .Forminput {
  //   min-width: 5rem;
  // }
  padding: 5rem;

  .formTitle {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
`;
const GraphCard = styled(Card)`
  flex-grow: 2;
  margin-right: 1rem;
`;
const GreetingsCard = styled(Card)`
  width: 100%;
  margin-bottom: 1rem;
  h1 {
    font-weight: normal;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-weight: normal;
    font-size: 1rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25vw;
  margin-top: 20vh;
  margin-right: 10vw;
  margin-bottom: 10vh;
  height: 53vh;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: ${theme.mainBlack};
  .graphCardsContainer {
    flex-grow: 1;
    width: 100%;
    display: flex;
    height: auto;
  }
`;

export default Dashboard;
