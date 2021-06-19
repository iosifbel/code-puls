import { useState } from "react";
import { Card, Button, InputField } from "./defaultComponents";
import CodeEditor from "./CodeEditor";
import styled from "styled-components";
import Header from "./Header";

function Assignment() {
  const [cod, setCod] = useState("#include<iostream.h>");
  const [stdin, setStdin] = useState("");
  const [limbaj, setLimbaj] = useState("4");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const assignment = {
      source_code: cod,
      language_id: limbaj,
      stdin: stdin,
    };
    console.log(assignment);

    setIsPending(true);

    const postUrl =
      "https://ce.judge0.com/submissions/?base64_encoded=false&wait=false";
    fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-key": "b23ccecf44msh3b556d90d58183bp18a3adjsnc26edf4c9876",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        useQueryString: true,
      },
      body: JSON.stringify(assignment),
    }).then((response) => {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }
      response.json().then(function (data) {
        console.log(data);
      });
      setIsPending(false);
    });
  };
  function onChange(newValue) {
    console.log("change", newValue);
  }
  return (
    <div>
      <Header></Header>
      <Wrapper>
        <ProblemCard>Problema 1</ProblemCard>
        <EditorCard>
          <CodeEditor></CodeEditor>
        </EditorCard>
        <ExecuteBtn primary>Executa</ExecuteBtn>
        <ConsoleCard>Console</ConsoleCard>
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

export default Assignment;

{
  /* <form onSubmit={handleSubmit}>
<label>Stdin</label>
<br></br>
<InputField
  type="text"
  value={stdin}
  onChange={(e) => setStdin(e.target.value)}
  placeholder="Stdin"
></InputField>
<br></br>
<br></br>
<label>Cod</label>
<br></br>
<textarea
  required
  value={cod}
  onChange={(e) => setCod(e.target.value)}
></textarea>
<br></br>
<br></br>
<label>Limbaj</label>
<br></br>
<select value={limbaj} onChange={(e) => setLimbaj(e.target.value)}>
  <option value="27">Java OpenJDK 8</option>
  <option value="4">C++ V.9.2.0</option>
</select>
<br></br>
<br></br>
</form> */
}
