import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Header, Sidebar} from './component'
import { useState } from 'react';

const App = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={'Home page'} />
        </Routes>
        <Sidebar />
      </Router>
    </div>
  );
}

export default App
