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
    console.log(productsCart);
    const empty = this.renderEmptyCart();
    if (productsCart.length === 0) return empty;
    return (
      <div>
        {' '}
        { productsCart.map(({ title, thumbnail, id, price }) => (
          <div
            key={ id }
          >
            <h3 data-testid="shopping-cart-product-name">{title}</h3>
            <img src={ thumbnail } alt={ title } />
            <p>
              `R$ $
              {price}
              `
            </p>
            <p data-testid="shopping-cart-product-quantity">1</p>
            <div>
              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ () => this.increaseQuantity() }
              >
                +
              </button>
              <button
                type="button"
                data-testid="product-decrease-quantity"
              >
                -

              </button>
            </div>
            <div>
              <button
                type="button"
                data-testid="remove-product"
              >
                REMOVER

              </button>
            </div>
          </div>)) }
      </div>
    );
  }
}
export default ShoppingCart;
