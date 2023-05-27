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
              className="product-card flex flex-col justify-between"
            >
              <p>{product.title}</p>
              <img
                className="w-36 container mx-auto"
                src={ product.thumbnail }
                alt={ product.title }
              />
              <h4 className="text-center">
                R$
                {product.price}
              </h4>
              <button
                data-testid="product-add-to-cart"
                type="button"
                onClick={ () => addToCart(product.id) }
              >
                Adicionar ao carrinho
              </button>
              <Link
                className="text-center"
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
