import styled from "styled-components";
import {Form} from "react-bootstrap"
import { AppContext } from "../context/context";
import React from "react";

function AddTest() {
  const {judge0Languges} = React.useContext(AppContext)
 
  
  return (
    <Wrapper>    
      <div>
        <FormTitle>Adaugă Test</FormTitle>
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Materie</Form.Label>
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Limbaj de programare</Form.Label>
            <Form.Control as="select">
              {judge0Languges.map((item) => (
                <option key={item.id}>{item.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect3">
            <Form.Label>Grupa care va susține testul</Form.Label>
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>        
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Problemă</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Form.Control placeholder="Rezultat așteptat" />
        </Form>
      </div>
    </Wrapper>
  );
}
const FormTitle = styled.p`
  display: flex;
  justify-content: center;
  font-size: 2em;
`;
const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-left: 20vw;
height: 92vh; 

div {
  width : 30vw;
}

`;

export default AddTest;
