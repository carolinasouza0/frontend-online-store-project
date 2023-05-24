/* eslint-disable react/jsx-indent */
import { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { getSavedCart } from '../helpers/localStorageCart';

class ProductDetails extends Component {
  state = {
    product: [],
  };

  componentDidMount() {
    this.handleCategory();
  }

  handleCategory = async () => {
    const {
      match: {
        params: { categoryId, id },
      },
    } = this.props;
    const product = await getProductsFromCategoryAndQuery(categoryId, '');
    // console.log(product, id);
    const productDetails = product.results.find((prod) => prod.id === id);
    this.setState({
      product: productDetails,
    });
  };

  handleSaveProduct = () => {
    const { product } = this.state;

    const prod = getSavedCart();
    localStorage.setItem('shoppingCart', JSON.stringify([...prod, product]));
  };

  render() {
    const { product } = this.state;
    const { title, thumbnail, price } = product;
    return (
      <div>
        <div>
          <section>
            <p data-testid="product-detail-name">{title}</p>
            <img
              data-testid="product-detail-image"
              src={ thumbnail }
              alt={ title }
            />
            <h3 data-testid="product-detail-price">{`R$ ${price}`}</h3>
          </section>
          <button
            type="button"
            onClick={ this.handleSaveProduct }
            data-testid="product-detail-add-to-cart"
          >
            Adicionar ao Carrinho
          </button>
          <Link to="/shoppingCart" data-testid="shopping-cart-button">
            Carrinho
          </Link>
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
      productList: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetails;
