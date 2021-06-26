import React, { useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "../context/context";
import {Card} from "../components/defaultComponents"
import {Route, Link, useRouteMatch, withRouter} from "react-router-dom"


function TestsGrid(props) {
  const {tests, isLoading, getStudentTests} = React.useContext(AppContext);
  const {url} = useRouteMatch()
 
  useEffect(() => {
    getStudentTests();
    console.log(tests);
}, [])

  const testClicked = (e) => {
    console.log("clicked card with id " + e.target.id);    
    props.parentCallBack(e.target.id)
    // e.preventDefault(); 
  }

  if(isLoading) {
    return ( <Wrapper>
      {" "}
      <div>
        <h1>Tests are loading..</h1>
      </div>
    </Wrapper>)
  }  
  return (
    <Wrapper>
    {" "}
    <div>
      <h1>Test programate</h1>
      <TestsContainer>
      {tests.map ((test) => (
        <div key = {test.id}>
          <Link to={`${url}/takeTest`} onClick = {testClicked}>
          <StyledCard  id = {test.id} >
            {test.titlu}
          </StyledCard>
          </Link>         
        </div>
      ))}
      </TestsContainer>      
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

const TestsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around; 
  font-size: 1rem;
`;

const StyledCard = styled(Card)`
    height: 20vh;
    width: 20vw;
    margin: 10%;
   
`;

export default withRouter(TestsGrid);
