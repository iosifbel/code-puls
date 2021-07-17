import axios from "axios";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { TestsGrid } from "../components";
import { AuthContext } from "../context";
import { utils } from "../context";

function History() {
  const user = useContext(AuthContext).authState.userInfo;
  const [tests, setTests] = useState([["test1", "test2"]]);

  async function getTests(user_id) {
    try {
      const { data } = await axios.get(
        `${utils.rootURL}/students/${user_id}/expired`
      );
      // console.log(data);
      setTests(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTests(user.id);
  }, []);

  return (
    <Wrapper>
      <TestsGrid tests={tests}></TestsGrid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  // height: 93vh;
  // align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin-left: 20vw;
  margin-top: 20vh;
`;

export default History;
