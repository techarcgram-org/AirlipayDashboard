import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Sidebar } from "./component";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  return (
    <div className="app-container">
      <Router>
        <div className="header">
        <Header />

        </div>
        <div className="content-container">
          <div className="sidebar">

          <Sidebar isOpen={sidebarIsOpen} toggle={toggleSidebar} />
          </div>
          <Routes>
            <Route path="/" element={"Home page"} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
