// Primeiro Commit
import React from 'react';
// import { getCategories } from './services/api';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/shoppingCart" component={ ShoppingCart } />
    </Switch>
  );
}

export default App;
