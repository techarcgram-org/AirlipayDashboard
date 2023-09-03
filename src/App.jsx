import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Header} from './component'

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={'Home page'} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
