import axios from "axios";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { TestsGrid } from "../components";
import { AuthContext } from "../context";
import { utils } from "../context";
import { Loader } from "../components";

function History() {
  const user = useContext(AuthContext).authState.userInfo;
  const [tests, setTests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getTests(user_id) {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${utils.rootURL}/students/${user_id}/expired`
      );
      console.log(data);
      setTests(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getTests(user.id);
  }, []);

  if (isLoading) {
    return <Loader></Loader>;
  }

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
  margin-top: 6rem;
`;

export default History;
