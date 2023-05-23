/* eslint-disable react/jsx-indent */
import { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';

class ProductDetails extends Component {
  state = {
    product: [],
  };

  componentDidMount() {
    this.handleCategory();
  }

  handleCategory = async () => {
    const { match: { params: { categoryId, id } } } = this.props;
    const product = await getProductsFromCategoryAndQuery(categoryId, '');
    console.log(product, id);
    const productDetails = product.results
      .find((prod) => prod.id === id);
    this.setState({
      product: productDetails,
    });
  };

  render() {
    console.log(this.props);
    const { product } = this.state;
    const { title, thumbnail, price } = product;
    return (
      <div>
        <section>
          <p data-testid="product-detail-name">{ title }</p>
          <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
          <h3 data-testid="product-detail-price">{`R$ ${price}`}</h3>
        </section>
        <div>
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            <Link
              to="/shoppingCart"
            >
              Carrinho
            </Link>
          </button>
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      categoryId: PropTypes.string,
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetails;
