import { Component } from 'react';
import PropTypes from 'prop-types';
import { getSavedCart } from '../helpers/localStorageCart';

class Checkout extends Component {
  state = {
    products: [],
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    cep: '',
    endereco: '',
    payment: '',
    error: false,
  };

  componentDidMount() {
    const cartProducts = getSavedCart();
    this.setState({ products: cartProducts });
    console.log(cartProducts);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { history } = this.props;
    const { nome, email, cpf, telefone, cep, endereco, payment } = this.state;
    const form = (nome && email && cpf && telefone && cep && endereco && payment);
    if (!form) {
      this.setState({ error: true });
    } else {
      localStorage.removeItem('shoppingCart');
      history.push('/');
    }
  };

  render() {
    const { products, error } = this.state;
    const invalidField = <h3 data-testid="error-msg">Campos inválidos</h3>;
    return (
      <div>
        {' '}
        { products.map(({ title, thumbnail, price }) => (
          <div key={ title } className="show-products-checkout">
            <h3>
              {' '}
              { title }
            </h3>
            <img src={ thumbnail } alt="foto do produto" />
            <p>
              R$
              {' '}
              { price }
            </p>
          </div>
        )) }
        <h2>Dados cadastrais:</h2>
        <form>
          <input
            name="nome"
            type="text"
            data-testid="checkout-fullname"
            placeholder="Nome"
            onChange={ this.handleChange }

          />
          <input
            name="email"
            type="email"
            data-testid="checkout-email"
            placeholder="Email"
            onChange={ this.handleChange }
          />
          <input
            name="cpf"
            type="text"
            data-testid="checkout-cpf"
            placeholder="CPF"
            onChange={ this.handleChange }
          />
          <input
            name="telefone"
            type="text"
            data-testid="checkout-phone"
            onChange={ this.handleChange }
            placeholder="Telefone"
          />
          <input
            name="cep"
            type="text"
            data-testid="checkout-cep"
            placeholder="CEP"
            onChange={ this.handleChange }
          />
          <input
            name="endereco"
            type="text"
            data-testid="checkout-address"
            placeholder="Endereço"
            onChange={ this.handleChange }
          />
          <label>
            Boleto
            <input
              type="radio"
              value="boleto"
              data-testid="ticket-payment"
              name="payment"
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Visa
            <input
              type="radio"
              value="visa"
              data-testid="visa-payment"
              name="payment"
              onChange={ this.handleChange }
            />
          </label>
          <label>
            MasterCard
            <input
              type="radio"
              value="mastercard"
              data-testid="master-payment"
              name="payment"
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Elo
            <input
              type="radio"
              value="elo"
              data-testid="elo-payment"
              name="payment"
              onChange={ this.handleChange }
            />
          </label>
        </form>
        <button
          type="button"
          data-testid="checkout-btn"
          onClick={ this.handleSubmit }
        >
          Enviar

        </button>
        { error && invalidField }
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
