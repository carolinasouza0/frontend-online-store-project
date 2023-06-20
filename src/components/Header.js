import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Home, ShoppingCart } from 'heroicons-react';
import Search from './Search';

class Header extends Component {
  render() {
    const { cartSize, handleInput, handleApiQuery } = this.props;

    return (
      <header>
        <div
          className="type-search flex justify-between
         bg-blue-900 p-2 w-full items-center"
        >
          <div className="flex items-center">
            <Link to="/" className="mr-2">
              <Home className="h-6 w-6" />
            </Link>
            <div className="search-container">
              <Search handleInput={ handleInput } handleApiQuery={ handleApiQuery } />
            </div>
          </div>
          <div
            className="flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              viewBox="0 0 512 512"
              id="online-shopping"
              className="h-20 w-20"
            >
              <path fill="#00efd1" d="M489,356.8H477.9V114.4a50.018,50.018,0,0,0-50-50H84.1a50.018,50.018,0,0,0-50,50V356.8H23a10.029,10.029,0,0,0-10,10v30.8a50.018,50.018,0,0,0,50,50H449a50.018,50.018,0,0,0,50-50V366.8A10.029,10.029,0,0,0,489,356.8ZM54.1,114.4a30.088,30.088,0,0,1,30-30H427.8a30.088,30.088,0,0,1,30,30V356.8H434.3V120.7a10.029,10.029,0,0,0-10-10H87.6a10.029,10.029,0,0,0-10,10V356.8H54.1ZM414.4,356.8H314.7a10.291,10.291,0,0,0-7.4,3.2l-8.1,8.8a30.358,30.358,0,0,1-22.1,9.7H234.8a29.981,29.981,0,0,1-22.1-9.7l-8.1-8.8a9.912,9.912,0,0,0-7.4-3.2H97.6V130.7H414.4ZM479,397.6a30.088,30.088,0,0,1-30,30H63a30.088,30.088,0,0,1-30-30V376.8H192.9l5.1,5.6a50.166,50.166,0,0,0,36.8,16.1h42.3a50.5,50.5,0,0,0,36.8-16.1l5.1-5.6H479Z" />
              <path fill="#00acea" d="M229 337.6A27.6 27.6 0 1 0 201.4 310 27.655 27.655 0 0 0 229 337.6zm0-35.3a7.6 7.6 0 1 1-7.6 7.6A7.6 7.6 0 0 1 229 302.3zM304.4 337.6A27.6 27.6 0 1 0 276.8 310 27.655 27.655 0 0 0 304.4 337.6zm0-35.3a7.6 7.6 0 1 1-7.6 7.6A7.6 7.6 0 0 1 304.4 302.3z" />
              <path fill="#00acea" d="M342.8,187.6H207.5l-2-11a30.012,30.012,0,0,0-24.2-24.2l-10.4-1.8a10,10,0,0,0-3.5,19.7l10.4,1.8a9.775,9.775,0,0,1,8,8l14.1,79.4a25.86,25.86,0,0,0,25.5,21.4h83.5a25.741,25.741,0,0,0,24.8-18.4l18.7-61.9a10.462,10.462,0,0,0-1.5-8.9A10.28,10.28,0,0,0,342.8,187.6Zm-28.3,69a5.88,5.88,0,0,1-5.6,4.2H225.4a5.811,5.811,0,0,1-5.8-4.9L211,207.6H329.3Z" />
            </svg>
            <h1
              className="text-white text-2xl font-bold ml-2
              tracking-wider uppercase leading-none text-center logo font-sans"
            >
              FrontEnd
              <br />
              Online Store
            </h1>
          </div>

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
  handleApiQuery: PropTypes.func.isRequired,
};

export default Header;
