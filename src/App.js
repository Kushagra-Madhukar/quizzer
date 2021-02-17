import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import Quiz from './components/Quiz';

function App() {
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route path='/:id'>
            <Quiz/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
