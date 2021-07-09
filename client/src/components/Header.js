import { DefaultNavbar } from "./defaultComponents";
import { FaRegUserCircle, FaArrowLeft } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { Nav } from "react-bootstrap";
import styled from "styled-components";
import logo from "../Assets/logo.svg";
import { useHistory, withRouter } from "react-router-dom";
import React from "react";
import { AppContext } from "../context/context";
import AvatarDropdown from "./AvatarDropdown";

function Header() {
  const { showHeader } = React.useContext(AppContext);
  const history = useHistory();
  function goBack() {
    history.goBack();
  }

  return !showHeader ? null : (
    <Wrapper>
      <nav>
        <div>
          <AvatarDropdown></AvatarDropdown>
        </div>
      </nav>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  // justify-content: end;

  nav {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

export default withRouter(Header);
