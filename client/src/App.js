import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login'
import TextWorkspace from './components/TextWorkspace'


function App() {
  return (
    <Router>
      <>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/workspace' component={TextWorkspace} />
          <Route render={() => <h1>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
