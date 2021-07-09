import React, { useContext, useEffect, useRef, useState } from "react";
import { FaCaretDown, FaSignOutAlt } from "react-icons/fa";
import { FaFontAwesome } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
//   import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from "../context/AuthContext";
import defaultAvatar from "../Assets/images/defaultAvatar.png";
import { Button } from "./defaultComponents";
import styled from "styled-components";

const DropdownItem = ({ item }) => (
  <Button className="dropDownItemContiner" onClick={item.onClick}>
    <AiOutlineLogout />
    <p className="dropDownItemTitle">{item.title}</p>
  </Button>
);

const DropdownContent = ({ dropdownItems }) => {
  return (
    <div className="dropDownContent">
      {dropdownItems.map((item, i) => {
        return (
          <div className="mt-1" key={i}>
            <DropdownItem item={item} />
          </div>
        );
      })}
    </div>
  );
};

const AvatarDropdown = () => {
  const node = useRef();
  const auth = useContext(AuthContext);
  const { authState } = auth;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownItems = [
    {
      title: "Log Out",
      icon: FaSignOutAlt,
      onClick: auth.logout,
    },
  ];

  const handleClick = (e) => {
    if (!node.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <Wrapper>
      <div ref={node}>
        <Button
          ref={node}
          className="ButtonContainer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img src={defaultAvatar} className="avatarImg" alt="Avatar" />
          <div className="logoutTextContainer">
            <p className="logoutText">{authState.userInfo.nume}</p>
            {/* <p className="logoutText">{authState.userInfo.prenume}</p> */}
          </div>
          <div className="dropDownCaret">
            <FaCaretDown></FaCaretDown>
          </div>
        </Button>

        {dropdownOpen && (
          <div className="dropDownItems">
            <DropdownContent dropdownItems={dropdownItems} />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-right: 4rem;
  justify-items: flex-end;

  .ButtonContainer {
    display: flex;
    border-radius: 3px;
    padding: 3px;
    margin-bottom: 0;
    align-items: center;
    &:focus {
      outline: 2px solid transparent;
      outline-offset: 2px;
    }
    --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }

  .avatarImg {
    width: 1.5rem;
    border-radius: 9999px;
    border-width: 2px;
    --tw-border-opacity: 1;
    border-color: rgba(255, 255, 255, var(--tw-border-opacity));
  }

  .logoutTextContainer {
    padding: 3px;
    display: flex;
    align-items: center;
    div {
      margin: 0;
    }
    p {
      margin-bottom: 0;
      margin-left: 0.5rem;
    }
  }

  //   .logoutText {
  //     text-color: white;
  //   }

  .dropDownCaret {
    margin: 0.25rem;
  }
  .dropDownItems {
    position: absolute;
    right: 6rem;
  }
  .dropDownContent {
    // width: 100%;
    // margin-right: 2rem;
  }
  .dropDownItemContiner {
    display: flex;
    align-items: center;
    width: 100%;
    // position: relative;
    // padding: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-right: 0;
    --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    border-radius: 0.2rem;
    margin-top: 0.5rem;
    p {
      margin-bottom: 0;
      margin-left: 0.5rem;
    }
  }
`;

export default AvatarDropdown;
