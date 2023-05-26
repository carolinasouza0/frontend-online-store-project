import { Component } from 'react';
import { getSavedCart } from '../helpers/localStorageCart';

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
      <div>
        {' '}
        {productsCart.map(({ title, thumbnail, id, price, quantity }) => (
          <div key={ id }>
            <h3 data-testid="shopping-cart-product-name">{title}</h3>
            <img src={ thumbnail } alt={ title } />
            <p>
              `R$ $
              {price}
              `
            </p>
            <p data-testid="shopping-cart-product-quantity">
              1
              {quantity === 0 ? 1 : quantity}
            </p>
            <div>
              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ () => this.increaseQuantity(id) }
              >
                +
              </button>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ () => this.decreaseQuantity(id) }
              >
                -
              </button>
            </div>
            <div>
              <button
                type="button"
                data-testid="remove-product"
                onClick={ () => this.removeProduct(id) }
              >
                REMOVER
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default ShoppingCart;
