// Primeiro Commit
import React from 'react';
import { getCategories } from './services/api';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
    </Switch>
  );
}

export default App;
