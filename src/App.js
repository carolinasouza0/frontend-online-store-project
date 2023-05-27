// Primeiro Commit
import React from 'react';
// import { getCategories } from './services/api';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/shoppingCart" component={ ShoppingCart } />
      <Route path="/ProductDetails/:categoryId/:id" component={ ProductDetails } />
      <Route path="/checkout" component={ Checkout } />
    </Switch>
  );
}

export default App;
