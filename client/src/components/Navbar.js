import React from "react";
import { NavbarData } from "./NavbarData";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IconContext } from "react-icons/lib";
import theme from "../Assets/theme";

function Navbar(props) {
  return (
    <div>
      <Wrapper>
        <IconContext.Provider value={{ color: theme.Blue1 }}>
          <div>
            <nav>
              <ul>
                {NavbarData.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </IconContext.Provider>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.section`
  nav {
    width: 20vw;
    height: 100vh;
    display: flex;
    justify-content: start;
    position: fixed;
    top: 0;
    background: ${theme.mainGrey};
  }

  li {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px 0px 8px 16px;
    list-style: none;
    height: 60px;

    a {
      font-weight: 900;
      font-size: 20px;
      text-decoration: none;
      color: ${theme.mainBlack};
      font-size: 18px;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0 18px;
      border-radius: 4px;
    }
  }

  span {
    margin-left: 16px;
  }
  ul {
    margin-top: 5em;
    list-style-type: none;
  }
`;

export default Navbar;
