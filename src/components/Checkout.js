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
      <div
        className="flex justify-center items-center w-screen mt-16 mb-16"
      >
        <div
          className="flex flex-col w-auto mr-20"
        >
          {' '}
          { products.map(({ title, thumbnail, price }) => (
            <div
              key={ title }
              className=" flex flex-col w-96 border-2 border-gray-300 rounded-md shadow-md
              p-2 m-2 justify-center items-center text-center"
            >
              <h3
                className=" text-base font-bold text-center w-40
                overflow-hidden overflow-ellipsis"
              >
                {' '}
                { title }
              </h3>
              <img
                src={ thumbnail }
                alt="foto do produto"
                className=" w-36 h-auto m-2"
              />
              <p
                className=" text-base font-bold text-center w-40
                overflow-hidden overflow-ellipsis"
              >
                R$
                {' '}
                { price }
              </p>
            </div>
          )) }
        </div>
        <div
          className="flex flex-col w-2/4 border-2 border-gray-300
          rounded-md shadow-md p-2 m-2"
        >
          <h2>Dados cadastrais:</h2>
          <form
            className=" flex w-auto flex-wrap p-2 m-2"
          >
            <input
              name="nome"
              type="text"
              data-testid="checkout-fullname"
              placeholder="Nome"
              onChange={ this.handleChange }
              className="w-2/4 p-2 m-2 border-2 border-gray-300 rounded-md
              shadow-md text-base font-bold"

            />
            <input
              name="email"
              type="email"
              data-testid="checkout-email"
              placeholder="Email"
              onChange={ this.handleChange }
              className="w-2/5 p-2 m-2 border-2 border-gray-300 rounded-md
              shadow-md text-base font-bold"
            />
            <input
              name="cpf"
              type="text"
              data-testid="checkout-cpf"
              placeholder="CPF"
              onChange={ this.handleChange }
              className="w-96 p-2 m-2 border-2 border-gray-300 rounded-md
              shadow-md text-base font-bold"
            />
            <input
              name="telefone"
              type="text"
              data-testid="checkout-phone"
              onChange={ this.handleChange }
              placeholder="Telefone"
              className="w-96 p-2 m-2 border-2 border-gray-300 rounded-md
              shadow-md text-base font-bold"
            />
            <input
              name="cep"
              type="text"
              data-testid="checkout-cep"
              placeholder="CEP"
              onChange={ this.handleChange }
              className="w-96 p-2 m-2 border-2 border-gray-300 rounded-md
              shadow-md text-base font-bold"
            />
            <input
              name="endereco"
              type="text"
              data-testid="checkout-address"
              placeholder="Endereço"
              onChange={ this.handleChange }
              className="w-96 p-2 m-2 border-2 border-gray-300 rounded-md
              shadow-md text-base font-bold"
            />
            <label
              className=" text-base font-bold text-center ml-40"
            >
              Boleto
              <input
                type="radio"
                value="boleto"
                data-testid="ticket-payment"
                name="payment"
                onChange={ this.handleChange }
                className="w-8"
              />
            </label>
            <label
              className=" text-base font-bold text-center"
            >
              Visa
              <input
                type="radio"
                value="visa"
                data-testid="visa-payment"
                name="payment"
                onChange={ this.handleChange }
                className="w-8 mr-8"
              />
            </label>
            <label
              className=" text-base font-bold text-center"
            >
              MasterCard
              <input
                type="radio"
                value="mastercard"
                data-testid="master-payment"
                name="payment"
                onChange={ this.handleChange }
                className="w-8 mr-8"
              />
            </label>
            <label
              className=" text-base font-bold text-center"
            >
              Elo
              <input
                type="radio"
                value="elo"
                data-testid="elo-payment"
                name="payment"
                onChange={ this.handleChange }
                className="w-8"
              />
            </label>
          </form>
          <button
            type="button"
            data-testid="checkout-btn"
            onClick={ this.handleSubmit }
            className="bg-blue-500 hover:bg-blue-700 text-white
            font-bold py-2 px-4 rounded my-2 mx-auto w-3/4
            transition duration-500 ease-in-out
            transform hover:-translate-y-1 hover:scale-110 shadow-md"
          >
            Enviar

          </button>
          { error && invalidField }
        </div>
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
