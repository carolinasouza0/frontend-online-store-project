import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  render() {
    const { productsList, addToCart } = this.props;
    return (
      <section>
        <div>
          { productsList.map((product) => (
            <div key={ product.id } data-testid="product">
              <p>{product.title}</p>
              <img
                src={ product.thumbnail }
                alt={ product.title }
              />
              <h4>
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
                data-testid="product-detail-link"
                to={ `/ProductDetails/${product.category_id}/${product.id}` }
              >
                Detalhes

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
