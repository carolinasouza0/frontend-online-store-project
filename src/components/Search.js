import { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  render() {
    const { handleApiQuery, handleInput } = this.props;
    return (
      <div className="search flex">
        <label>
          <input
            data-testid="query-input"
            onChange={ handleInput }
            className="border-2 border-gray-300 bg-white h-7 px-3
            pr-15 rounded-lg text-sm focus:outline-none m-2"
            placeholder="Digite o nome do produto"
          />
        </label>
        <button
          data-testid="query-button"
          onClick={ handleApiQuery }
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded
          my-2 mx-auto w-3/4 transition duration-500 ease-in-out transform
         shadow-md rounded-md w-20 mx-2 h-7 p-0.5"
        >
          Pesquisar

        </button>
      </div>
    );
  }
}

Search.propTypes = {
  handleInput: PropTypes.func.isRequired,
  handleApiQuery: PropTypes.func.isRequired,
};

export default Search;
