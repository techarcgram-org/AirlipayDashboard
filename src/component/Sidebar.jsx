import React from "react";
import { IconContext } from "react-icons";
// import {
//   BsSearch,
//   BsBell,
//   FiSettings,
// } from "react-icons";
import { AiFillHome, AiOutlineMail, AiFillCopy } from "react-icons/ai";
import {BsFillAirplaneFill} from 'react-icons/bs'
import { Nav, Navbar } from "react-bootstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

import SubMenu from "./Submenu";

const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3>Bootstrap Sidebar</h3>
    </div>
    <div className="side-menu">
      <Nav className="flex-column pb-3">
        <p>Dummy Heading</p>
        <SubMenu title="Home" icon={<AiFillHome />} items={submenus[0]} />
        <Nav.Item>
          <Nav.Link as={Link} to={"/about"}>
            <IconContext.Provider value={{ className: "mr-2" }}>
              <AiOutlineMail />
            </IconContext.Provider>
            About
          </Nav.Link>
        </Nav.Item>
        <SubMenu title="Pages" icon={<AiFillCopy />} items={submenus[1]} />
        <Nav.Item>
          <Nav.Link as={Link} to={"/pages"}>
            <IconContext.Provider value={{ className: "mr-2" }}>
              {/* <BsImage /> */}
            </IconContext.Provider>
            Portfolio
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={"/faq"}>
            <IconContext.Provider value={{ className: "mr-2" }}>
              {/* <BsQuestion /> */}
            </IconContext.Provider>
            FAQ
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={"/contact"}>
            <IconContext.Provider value={{ className: "mr-2" }}>
              <BsFillAirplaneFill />
            </IconContext.Provider>
            Contact
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  </div>
);

const submenus = [
  [
    {
      title: "Home 1",
      target: "Home-1",
    },
    {
      title: "Home 2",
      target: "Home-2",
    },
    {
      title: "Home 3",
      target: "Home-3",
    },
  ],
  [
    {
      title: "Page 1",
      target: "Page-1",
    },
    {
      title: "Page 2",
      target: "Page-2",
    },
  ],
];

export default SideBar;
