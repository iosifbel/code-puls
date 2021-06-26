import styled from "styled-components";

function Tests() {
  return (
    <Wrapper>
    {" "}
    <div>
      <h1>Test programate</h1>
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

export default Tests;
