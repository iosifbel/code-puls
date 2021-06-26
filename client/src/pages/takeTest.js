import { Card, Button } from "../components/defaultComponents"
import CodeEditor from "../components/CodeEditor";
import styled from "styled-components";
import Header from "../components/Header";

function TakeTest({testId}) {
  
  return (
    <div>      
      <Wrapper>
        <ProblemCard>Problema 1</ProblemCard>
        <EditorCard>
          <CodeEditor></CodeEditor>
        </EditorCard>
        <ExecuteBtn primary>Executa</ExecuteBtn>
        <ConsoleCard>Console {`testul cu codul ${testId}`}</ConsoleCard>
        <SubmitBtn secondary>Trimite</SubmitBtn>
      </Wrapper>
    </div>
  );
}
const Wrapper = styled.section`
  display: grid;
  height: 100vh;
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
`;
const EditorCard = styled(Card)`
  grid-area: B;
  margin-right: 2em;
  margin-top: 5em;
  align-items: streched
  justify-items : streched;
  
`;
const ConsoleCard = styled(Card)`
  grid-area: C;
  margin-right: 2em;
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