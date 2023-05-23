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
      <p data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </p>
    </section>
  );

  render() {
    const { productsCart } = this.state;
    const empty = this.renderEmptyCart();
    if (productsCart.length === 0) return empty;
    return (
      <div>
        {' '}
        { productsCart.map((prod) => (
          <div key={ prod.title }>
            <h3 data-testid="shopping-cart-product-name">{prod.title}</h3>
            <img src={ prod.thumbnail } alt={ prod.title } />
            <p>
              `R$ $
              {prod.price}
              `
            </p>
            <p data-testid="shopping-cart-product-quantity">1</p>
          </div>)) }
      </div>
    );
  }
}
export default ShoppingCart;
