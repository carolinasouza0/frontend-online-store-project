import { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  render() {
    const { handleApiQuery, handleInput } = this.props;
    return (
      <div className="search">
        <label>
          <input data-testid="query-input" onChange={ handleInput } />
        </label>
        <button data-testid="query-button" onClick={ handleApiQuery }>Pesquisar</button>
      </div>
    );
  }
}

Search.propTypes = {
  handleInput: PropTypes.func.isRequired,
  handleApiQuery: PropTypes.func.isRequired,
};

export default Search;
