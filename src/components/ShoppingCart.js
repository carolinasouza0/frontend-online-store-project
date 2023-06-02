import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getSavedCart } from '../helpers/localStorageCart';
import '../styles/ShoppingCart.css';

class ShoppingCart extends Component {
  state = {
    productsCart: [],
  };

  componentDidMount() {
    this.handleProducts();
  }

  handleProducts = () => {
    const savedProducts = getSavedCart();

    this.setState({ productsCart: savedProducts });
  };

  renderEmptyCart = () => (
    <section>
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    </section>
  );

  increaseQuantity = (id) => {
    const { productsCart } = this.state;
    const arrayProductsIncrease = [];
    const productIncrease = productsCart.find((prod) => id === prod.id);
    arrayProductsIncrease.push(productIncrease);
    console.log(arrayProductsIncrease);

    const newCart = arrayProductsIncrease.map((product) => {
      product.quantity += 1;
      return product;
    });
    this.setState((prevState) => ({
      ...prevState,
      newCart,
    }));
  };

  decreaseQuantity = (id) => {
    const { productsCart } = this.state;
    const arrayProductsIncrease = [];
    const productIncrease = productsCart.find((prod) => id === prod.id);
    arrayProductsIncrease.push(productIncrease);

    const newCart = arrayProductsIncrease.map((product) => {
      product.quantity -= 1;
      return product;
    });
    this.setState((prevState) => ({
      ...prevState,
      newCart,
    }));
  };

  removeProduct = (id) => {
    const { productsCart } = this.state;
    const removeItem = productsCart.find((product) => product.id === id);
    const index = productsCart.indexOf(removeItem);
    productsCart.splice(index, 1);
    this.setState({
      productsCart,
    });
    localStorage.setItem('shoppingCart', JSON.stringify(productsCart));
  };

  render() {
    const { productsCart } = this.state;
    const empty = this.renderEmptyCart();
    if (productsCart.length === 0) return empty;
    return (
      <div
        className="flex w-full my-10 p-5 border-2"
      >
        <div
          className="shopping-cart-container flex flex-col
        w-1/2 my-10 p-5 border-2 border-gray-300
        rounded-md shadow-md bg-white h-auto
         "
        >
          {' '}
          {productsCart.map(({ title, thumbnail, id, price, quantity }) => (
            <div
              key={ id }
              className="flex flex-col justify-center items-center w-1/2
            mx-auto my-10 p-5 border-2 border-gray-300 rounded-md shadow-md
            bg-white h-auto w-96 mx-auto"
            >
              <h3
                data-testid="shopping-cart-product-name"
                className="text-center text-xl font-bold my-2 w-3/4 mx-auto text-gray-700"
              >
                {title}

              </h3>
              <img
                src={ thumbnail }
                alt={ title }
                className="w-auto mx-auto my-2 rounded-md shadow-md border-2
              border-gray-300 h-40 flex justify-center items-center"
              />
              <p
                className="text-center text-xl font-bold my-2 w-3/4 mx-auto text-gray-700"
              >
                R$
                {price}
              </p>
              <div
                className=" flex justify-center items-center"
              >
                <button
                  type="button"
                  data-testid="product-increase-quantity"
                  onClick={ () => this.increaseQuantity(id) }
                  className="mr-2 border-2 border-gray-300 rounded-md shadow-md
                bg-white h-10 w-10 flex justify-center items-center
                text-gray-700 font-bold text-xl hover:bg-gray-300
                hover:text-white hover:shadow-lg transition duration-500 ease-in-out"
                >
                  +
                </button>
                <p
                  data-testid="shopping-cart-product-quantity"
                  className="text-center text-xl font-bold my-2
                  w-3/4 mx-auto text-gray-700"
                >
                  {quantity}
                </p>
                <button
                  type="button"
                  data-testid="product-decrease-quantity"
                  onClick={ () => this.decreaseQuantity(id) }
                  className="border-2 border-gray-300 rounded-md shadow-md bg-white h-10
                w-10 flex justify-center items-center text-gray-700 font-bold text-xl
                hover:bg-gray-300 hover:text-white hover:shadow-lg
                transition duration-500 ease-in-out mr-2 my-2"
                >
                  -
                </button>
              </div>
              <div>
                <button
                  type="button"
                  data-testid="remove-product"
                  onClick={ () => this.removeProduct(id) }
                  className="border-2 border-gray-300 rounded-md shadow-md bg-white h-10
                w-auto flex justify-center items-center text-gray-700 font-bold text-lg
                hover:bg-gray-300 hover:text-white hover:shadow-lg
                transition duration-500 ease-in-out mr-2 my-2 p-1"
                >
                  REMOVER
                </button>
              </div>
            </div>
          ))}
        </div>
        <div
          className=" flex flex-col justify-center items-center w-1/2"
        >
          <Link
            to="/checkout"
            data-testid="checkout-products"
            className="border-2 border-gray-300 rounded-md shadow-md bg-white h-10
            w-1/2 flex justify-center items-center text-gray-700 font-bold
            text-lg hover:bg-gray-300 hover:text-white hover:shadow-lg
            transition duration-500 ease-in-out mr-2 my-2 p-1"
          >
            {' '}
            Finalizar compra
            {' '}

          </Link>
        </div>
      </div>
    );
  }
}
export default ShoppingCart;
