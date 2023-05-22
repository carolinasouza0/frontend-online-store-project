import { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>

        <div>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>

        <div>
          <button
            type="button"
          >
            <Link
              to="/shoppingCart"
              data-testid="shopping-cart-button"
            >
              carrinho
            </Link>
          </button>
        </div>
      </div>

    );
  }
}

export default Home;
