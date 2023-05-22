import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';
import Categories from './Categories';

class Home extends Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    const categorysApi = await getCategories();
    this.setState({ categories: categorysApi });
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <Categories categories={ categories } />
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
