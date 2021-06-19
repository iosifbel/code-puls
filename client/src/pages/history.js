import styled from "styled-components";
function History() {
  return (
    <Wrapper>
      {" "}
      <div>
        <h1>Istoric</h1>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 90vh;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

export default History;
