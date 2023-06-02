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
          items-start container px-4 mx-auto my-2 rounded-md"
        >
          <h3 className="text-2xl font-bold">
            Categorias:

          </h3>
          <div className="categories-map flex flex-col gap-y-1">
            {
              categories.map((category) => (
                <div className="flex gap-x-0.5" key={ category.id }>
                  <button
                    data-testid="category"
                    value={ category.name }
                    onClick={ () => handleApiId(category.id) }
                    className="bg-blue-500 hover:bg-blue-700 text-white
                    font-bold py-2 px-4 rounded my-2 mx-auto w-3/4
                    transition duration-500 ease-in-out transform hover:-translate-y-1
                    hover:scale-80 shadow-md rounded-md p-2"
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
