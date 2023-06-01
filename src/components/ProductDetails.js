import { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { getSavedCart, getSavedComments, savedComents }
  from '../helpers/localStorageCart';

class ProductDetails extends Component {
  state = {
    product: [],
    email: '',
    text: '',
    rating: '',
    error: false,
    evaluation: [],
    cartSize: 0,
  };

  componentDidMount() {
    this.handleCategory();
    const storageCart = getSavedCart();
    this.setState({ cartSize: storageCart.length });
  }

  handleCategory = async () => {
    const {
      match: {
        params: { categoryId, id },
      },
    } = this.props;
    const product = await getProductsFromCategoryAndQuery(categoryId, '');
    const productDetails = product.results.find((prod) => prod.id === id);
    this.setState({
      product: productDetails,
    });
    const evaluation = getSavedComments(id);
    console.log(id);
    this.setState({ evaluation });
  };

  handleSaveProduct = () => {
    const { product } = this.state;

    const prod = getSavedCart();
    localStorage.setItem('shoppingCart', JSON.stringify([...prod, product]));
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { rating, email, text, evaluation } = this.state;
    if (!email.includes('@') || rating === '') {
      this.setState({
        error: true,
      });
    } else {
      const { match: { params: { id } } } = this.props;
      const reviewObj = {
        email,
        text,
        rating,
        productId: id,
      };
      savedComents(reviewObj);

      this.setState({
        evaluation: [...evaluation, reviewObj],
        email: '',
        text: '',
        rating: '',
        error: false,
      });
    }
  };

  render() {
    const { product, cartSize } = this.state;
    const { title, thumbnail, price } = product;
    const { email, text, error, evaluation } = this.state;
    const invalidField = <h3 data-testid="error-msg">Campos inválidos</h3>;
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
          <Link
            to="/shoppingCart"
            data-testid="shopping-cart-size"
          >
            {cartSize}
          </Link>
        </div>
        <div>
          <form>
            <label>
              Email:
              <input
                data-testid="product-detail-email"
                type="email"
                value={ email }
                onChange={ this.handleChange }
                name="email"
                
              />
            </label>
            <label>
              <input
                type="radio"
                data-testid="1-rating"
                value="1"
                onChange={ this.handleChange }
                name="rating"
              />
              1
            </label>
            <label>

              <input
                type="radio"
                data-testid="2-rating"
                value="2"
                onChange={ this.handleChange }
                name="rating"
              />
              2
            </label>
            <label>

              <input
                type="radio"
                data-testid="3-rating"
                value="3"
                onChange={ this.handleChange }
                name="rating"
              />
              3
            </label>
            <label>

              <input
                type="radio"
                data-testid="4-rating"
                value="4"
                onChange={ this.handleChange }
                name="rating"
              />
              4
            </label>
            <label>

              <input
                type="radio"
                data-testid="5-rating"
                value="5"
                onChange={ this.handleChange }
                name="rating"
              />
              5
            </label>

            <div>
              <textarea
                data-testid="product-detail-evaluation"
                value={ text }
                rows="5"
                cols="20"
                onChange={ this.handleChange }
                name="text"

              />
            </div>
            <div>
              <button
                type="button"
                data-testid="submit-review-btn"
                onClick={ this.handleSubmit }
              >
                Enviar

              </button>
              {error && invalidField }
            </div>

          </form>
          <div>
            { evaluation.map((item, index) => (
              <div key={ index }>
                <h4 data-testid="review-card-email">{ item.email}</h4>
                <p
                  data-testid="review-card-evaluation"
                >
                  { item.text}

                </p>
                <h4 data-testid="review-card-rating">{item.rating}</h4>
              </div>
            ))}
          </div>
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
