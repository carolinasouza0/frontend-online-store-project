import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Home, ShoppingCart } from 'heroicons-react';
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
          <div className="flex items-center">
            <Link to="/" className="mr-2">
              <Home className="h-6 w-6" />
            </Link>
            <div className="search-container">
              <Search handleInput={ handleInput } handleSearch={ handleSearch } />
            </div>
          </div>
          <h1 className="logo text-2xl font-bold text-center mt-2 text-white flex-grow">
            FrontEnd Online Store
          </h1>
          <div className="relative">
            <Link
              to="/shoppingCart"
              data-testid="shopping-cart-size"
              className="flex items-center ml-2"
            >
              <ShoppingCart className="h-6 w-6" />

              <span
                className="bg-red-500 text-white rounded-full
                px-1 py-0.1 text-xs -ml-1 -mt-5"
              >
                {cartSize}
              </span>
            </Link>
          </div>
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
