import styled from "styled-components";
function AddTest() {
  return (
    <Wrapper>
      {" "}
      <div>
        Add Test
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

export default AddTest;
