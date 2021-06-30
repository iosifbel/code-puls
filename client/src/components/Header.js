import { DefaultNavbar } from "./defaultComponents";
import { FaRegUserCircle, FaArrowLeft } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { Nav } from "react-bootstrap";
import styled from "styled-components";
import logo from "../Assets/logo.svg";
import { useHistory } from "react-router-dom";
import React from "react";
import { AppContext } from "../context/context";

function Header() {
  const { showHeader } = React.useContext(AppContext);
  const history = useHistory();
  function goBack() {
    history.goBack();
  }
  console.log(showHeader);
  return !showHeader ? null : (
    <div>
      <DefaultNavbar>
        <Wrapper>
          <StyledArrow onClick={goBack}>
            <FaArrowLeft></FaArrowLeft>
          </StyledArrow>
          <StyledBrand href="/">
            <img alt="" src={logo} width="30" height="30" />
            CodPuls
          </StyledBrand>
          <StyledButtonsDiv>
            {" "}
            <Nav.Link href="/">
              <FaRegUserCircle></FaRegUserCircle>
            </Nav.Link>
            <Nav.Link href="/">
              <MdMenu href="/"></MdMenu>
            </Nav.Link>
          </StyledButtonsDiv>
        </Wrapper>
      </DefaultNavbar>
    </div>
  );
}

const Wrapper = styled.section`
  display: grid;
  width: 100%;
  grid-template-areas: "A    B   B   C";
  z-index: 100;
`;

const StyledArrow = styled(Nav.Link)`
  grid-area: A;
`;

const StyledBrand = styled(Nav.Link)`
  grid-area: B;
`;

const StyledButtonsDiv = styled.div`
  grid-area: C;
  display: flex;
  flex-direction: row;
`;

export default Header;
