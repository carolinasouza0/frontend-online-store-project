import { Component } from 'react';
import PropTypes from 'prop-types';

class Categories extends Component {
  render() {
    const { categories } = this.props;
    return (
      <aside>
        <div>
          <h3>Categorias:</h3>
          {
            categories.map((category) => (
              <label
                data-testid="category"
                key={ category.id }
              >

                {category.name}

                <input
                  type="radio"
                />
              </label>
            ))
          }

        </div>
      </aside>
    );
  }
}
Categories.propTypes = {
  categories: PropTypes.arrayOf().isRequired,
};

export default Categories;
