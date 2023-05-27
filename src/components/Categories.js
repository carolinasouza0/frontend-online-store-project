import { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Categories.css';

class Categories extends Component {
  render() {
    const { categories, handleApiId } = this.props;
    return (
      <aside>
        <div
          className="categories-container flex flex-col
          items-start container px-4"
        >
          <h3>Categorias:</h3>
          <div className="categories-map flex flex-col gap-y-1">
            {
              categories.map((category) => (
                <div className="flex gap-x-0.5" key={ category.id }>
                  <button
                    data-testid="category"
                    value={ category.name }
                    onClick={ () => handleApiId(category.id) }
                  >
                    {category.name}

                  </button>
                </div>
              ))
            }
          </div>

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
