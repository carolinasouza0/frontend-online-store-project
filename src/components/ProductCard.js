import { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCard extends Component {
  render() {
    const { productsList } = this.props;
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
              <h4>{product.price}</h4>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

ProductCard.propTypes = {
  productsList: PropTypes.arrayOf.isRequired,
};

export default ProductCard;
