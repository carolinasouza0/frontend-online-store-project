import { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { getSavedCart, getSavedComments, savedComents }
  from '../helpers/localStorageCart';
import Header from './Header';

class ProductDetails extends Component {
  state = {
    product: [],
    email: '',
    text: '',
    rating: '',
    error: false,
    evaluation: [],
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
    const { product } = this.state;
    const { title, thumbnail, price } = product;
    const { email, text, error, evaluation } = this.state;
    const invalidField = <h3 data-testid="error-msg">Campos inválidos</h3>;
    return (
      <div>
        <div>
          <Header />
          <section
            className="product-detail container flex flex-col justify-center
            items-center w-1/2 mx-auto my-10 p-5 border-2 border-gray-300"
          >
            <p
              data-testid="product-detail-name"
              className=" flex flex-col w-96 p-2 m-2 justify-center
              items-center text-center text-xl font-bold"
            >
              {title}

            </p>
            <img
              data-testid="product-detail-image"
              src={ thumbnail }
              alt={ title }
              className="w-40 p-4 mx-auto my-2 rounded-md shadow-md border-2"
            />
            <h3
              data-testid="product-detail-price"
              className="text-base font-bold text-center w-40
              overflow-hidden overflow-ellipsis text-lg"
            >
              {`R$ ${price}`}

            </h3>
            <button
              type="button"
              onClick={ this.handleSaveProduct }
              data-testid="product-detail-add-to-cart"
              className="bg-blue-500 hover:bg-blue-700 text-white
            font-bold py-2 px-4 rounded mt-4"
            >
              Adicionar ao Carrinho
            </button>
            <Link
              to="/shoppingCart"
              data-testid="shopping-cart-button"
              className="bg-blue-500 hover:bg-blue-700 text-white p-2 m-4"
            >
              Carrinho
            </Link>
          </section>
        </div>
        <div
          className="flex flex-col justify-center items-center w-1/2
          mx-auto my-10 p-5 border-2 border-gray-300"
        >
          <form>
            <label>

              <input
                data-testid="product-detail-email"
                type="email"
                value={ email }
                onChange={ this.handleChange }
                name="email"
                placeholder="Digite seu email"
                className="border-2 border-gray-300 rounded-md shadow-md mb-4 p-1 w-80"
              />
            </label>
            <p
              className="text-center text-xl font-bold"
            >
              Avaliação do produto:

            </p>

            <label
              className=" text-base font-bold text-center"
            >
              <input
                type="radio"
                data-testid="1-rating"
                value="1"
                onChange={ this.handleChange }
                name="rating"
                className="w-8"
              />
              1
            </label>
            <label
              className=" text-base font-bold text-center"
            >

              <input
                type="radio"
                data-testid="2-rating"
                value="2"
                onChange={ this.handleChange }
                name="rating"
                className="w-8 ml-6"
              />
              2
            </label>
            <label
              className=" text-base font-bold text-center"
            >

              <input
                type="radio"
                data-testid="3-rating"
                value="3"
                onChange={ this.handleChange }
                name="rating"
                className="w-8 ml-6"
              />
              3
            </label>
            <label
              className=" text-base font-bold text-center"
            >

              <input
                type="radio"
                data-testid="4-rating"
                value="4"
                onChange={ this.handleChange }
                name="rating"
                className="w-8 ml-6"
              />
              4
            </label>
            <label
              className=" text-base font-bold text-center"
            >

              <input
                type="radio"
                data-testid="5-rating"
                value="5"
                onChange={ this.handleChange }
                name="rating"
                className="w-8 ml-6"
              />
              5
            </label>

            <div>
              <textarea
                data-testid="product-detail-evaluation"
                value={ text }
                rows="5"
                cols="30"
                onChange={ this.handleChange }
                name="text"
                placeholder="Deixe seu comentário"
                className="border-2 border-gray-300 rounded-md shadow-md p-1 mt-8"

              />
            </div>
            <div>
              <button
                type="button"
                data-testid="submit-review-btn"
                onClick={ this.handleSubmit }
                className="bg-blue-500 hover:bg-blue-700 text-white
                font-bold py-2 px-4 rounded mt-4"
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
