import React from "react";
import { NavbarDataStudent } from "./NavbarDataStudent";
import { NavbarDataTeacher } from "./NavbarDataTeacher";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IconContext } from "react-icons/lib";
import theme from "../Assets/theme";
import { AppContext } from "../context/context";
import { useState } from "react";
import logo from "../Assets/logo.svg";

function Navbar(props) {
  let NavbarData =
    props.type === "student" ? NavbarDataStudent : NavbarDataTeacher;
  const { showNavbar } = React.useContext(AppContext);
  const [active, setActive] = useState();
  const activeStyle = { color: theme.mainBlue };

  function handleClick(menuItem) {
    setActive(menuItem);
  }

  return !showNavbar ? null : (
    <div>
      <Wrapper>
        <IconContext.Provider value={{ color: theme.Blue1 }}>
          <div>
            <nav>
              <ul>
                <li className="logo">
                  <img
                    className="logo-img"
                    alt=""
                    src={logo}
                    width="70"
                    height="70"
                  />
                  <div className="logo-txt">Codpuls</div>
                </li>
                {NavbarData.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link
                        to={item.path}
                        style={active === item ? activeStyle : {}}
                        onClick={(e) => handleClick(item)}
                      >
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

  .logo {
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 2em;
    margin-bottom: 10%;
    .logo-img {
      margin-right: 10px;
    }
  }

  span {
    margin-left: 16px;
  }
  ul {
    margin-top: 3em;
    list-style-type: none;
  }
`;

export default Navbar;
