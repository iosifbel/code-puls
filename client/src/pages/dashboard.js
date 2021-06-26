
import styled from "styled-components";
import React from "react";


function Dashboard(props) {  
  return (
    <Wrapper>
    {" "}
    <div>
      <h1>Panou de lucru</h1>
      <h2>{props.type ? props.type : "none"}</h2>     
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

export default Dashboard;
