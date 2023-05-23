import { Component } from 'react';
import PropTypes from 'prop-types';

class Categories extends Component {
  render() {
    const { categories, handleApiId } = this.props;
    return (
      <aside>
        <div>
          <h3>Categorias:</h3>
          {
            categories.map((category) => (
              <button
                data-testid="category"
                key={ category.id }
                value={ category.name }
                onClick={ () => handleApiId(category.id) }
              >
                {category.name}

              </button>
            ))
          }

        </div>
      </aside>
    );
  }
}
Categories.propTypes = {
  categories: PropTypes.arrayOf().isRequired,
  handleApiId: PropTypes.func.isRequired,
};

export default Categories;
