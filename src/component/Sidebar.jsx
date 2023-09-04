import React from "react";
import classNames from "classnames";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import data from "../constant/data";

const SideBar = ({ isOpen, toggle }) => (
  <div
    className={classNames("sidebar", { "is-open": isOpen })}
    style={{ backgroundColor: "#785AE6",width:'30%',maxWidth:'250px',height:'100vh - 8rem' }}
  >
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
    </div>
    <div className="side-menu">
      <Nav className="flex-column pb-3">
        {data.sidebarData.map((item) => (
          <Nav.Item key={item.route}>
            <Nav.Link style={{color:'#fff',marginBottom:'1rem'}} as={Link} to={item.route}>
              <img
                src={item.image}
                alt=""
                width={25}
                style={{ marginRight: 12 }}
              />
              {item.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  </div>
);

export default SideBar;
