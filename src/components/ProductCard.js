import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

class ProductCard extends Component {
  render() {
    const { productsList, addToCart } = this.props;
    return (
      <section>
        <div className="flex flex-wrap justify-around mt-2">
          { productsList.map((product) => (
            <div
              key={ product.id }
              data-testid="product"
              className="product-card flex flex-col justify-between bg-white
              rounded-md shadow-md hover:shadow-lg
              transition duration-500 ease-in-out transform"
            >
              <p
                className="text-center text-xl text-zinc-900 font-bold my-2"
              >
                {product.title}

              </p>
              <img
                className="w-36 container mx-auto my-2 rounded-md
                shadow-md hover:shadow-lg transition duration-500 ease-in-out
                transform hover:-translate-y-1 hover:scale-110"
                src={ product.thumbnail }
                alt={ product.title }
              />
              <h4
                className="text-center text-zinc-900 font-bold my-2 "
              >
                R$
                {product.price}
              </h4>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white
                font-bold py-2 px-4 rounded my-2 mx-auto w-3/4
                transition duration-500 ease-in-out
                transform hover:-translate-y-1 hover:scale-110 shadow-md"
                data-testid="product-add-to-cart"
                type="button"
                onClick={ () => addToCart(product.id) }
              >
                Adicionar ao carrinho
              </button>
              <Link
                className="text-center text-blue-500 hover:text-blue-700
                my-2 mx-auto w-3/4  transition duration-500 ease-in-out
                transform hover:-translate-y-1 hover:scale-110 shadow-md rounded-md p-2"
                data-testid="product-detail-link"
                to={ `/ProductDetails/${product.category_id}/${product.id}` }
              >
                Ver detalhes

              </Link>
            </div>

          ))}
        </div>
      </section>
    );
  }
}

ProductCard.propTypes = {
  productsList: PropTypes.arrayOf.isRequired,
  addToCart: PropTypes.shape({}).isRequired,
};

export default ProductCard;
