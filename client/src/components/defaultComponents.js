import styled from "styled-components";
import { Navbar, Nav } from "react-bootstrap";
import theme from "../Assets/theme";

export const Button = styled.button`
  background: white;
  color: ${(props) => (props.primary ? theme.mainBlue : theme.mainOrange)};
  margin: 1em;
  font-size: 1em;
  padding: 0.25em 2em;
  border: 2px solid
    ${(props) => (props.primary ? theme.mainBlue : theme.mainOrange)};
  border-radius: 3px;

  &:hover {
    background: ${(props) =>
      props.primary ? theme.mainBlue : theme.mainOrange};
    color: white;
    font-weight: bold;
  }
`;

export const Card = styled.div`
  padding: 1.5rem 2rem;
  background: white;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

export const InputField = styled.input`
  background: white;
  border: 1px solid ${theme.Grey1};
  box-sizing: border-box;
  border-radius: 5px;
`;

export const DefaultNavbar = styled(Navbar)`
  background: ${theme.mainGrey};
  //box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
  padding-left: 2em;
`;

export const DefaultNav = styled(Nav)``;
