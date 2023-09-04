import React, { useState } from "react";
import classNames from "classnames";
import { Collapse, Nav } from "react-bootstrap";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

const SubMenu = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => setCollapsed(!collapsed);
  const { icon, title, items } = props;

  return (
    <div>
      <Nav.Item
        onClick={toggle}
        className={classNames({ "menu-open": !collapsed })}
      >
        <Nav.Link className="dropdown-toggle">
          <IconContext.Provider value={{ className: "mr-2" }}>
            {icon}
          </IconContext.Provider>
          {title}
        </Nav.Link>
      </Nav.Item>
      <Collapse
        in={!collapsed}
        className={classNames("items-menu", { "mb-1": !collapsed })}
      >
        <Nav className="flex-column">
          {items.map((item, index) => (
            <Nav.Item key={index} className="pl-4">
              <Nav.Link as={Link} to={item.target}>
                {item.title}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Collapse>
    </div>
  );
};

export default SubMenu;
