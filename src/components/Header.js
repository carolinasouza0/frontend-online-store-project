import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Search from './Search';

class Header extends Component {
  render() {
    const { cartSize, handleInput, handleSearch } = this.props;

    return (
      <header>
        <div
          className="type-search flex justify-between
         bg-blue-800 p-2 w-full items-center"
        >
          <Search handleInput={ handleInput } handleSearch={ handleSearch } />
          <h1 className="logo text-2xl font-bold text-center mt-2 text-white">
            FrontEnd Online Store
          </h1>
          <Link
            to="/"
            className="text-2xl font-bold text-center
            text-white mt-2 mr-2 border-solid rounded-full
            p-1 w-10 h-10 bg-teal-500 hover:bg-teal-400"
          >
            Home
          </Link>
          <Link
            to="/shoppingCart"
            data-testid="shopping-cart-size"
            className="text-2xl font-bold text-center text-white
            mt-2 mr-2 border-solid rounded-full
             p-1 w-10 h-10 bg-teal-500 hover:bg-teal-400"
          >
            {cartSize}
          </Link>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  cartSize: PropTypes.number.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default Header;
