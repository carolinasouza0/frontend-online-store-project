import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Categories from './Categories';
import Search from './Search';
import ProductCard from './ProductCard';

class Home extends Component {
  state = {
    categories: [],
    productsList: [],
    searchProduct: '',
  };

  async componentDidMount() {
    const categorysApi = await getCategories();
    this.setState({ categories: categorysApi });
  }

  handleInput = ({ target }) => {
    const { value } = target;
    this.setState({ searchProduct: value });
  };

  handleApiQuery = async () => {
    const { searchProduct } = this.state;
    const queryApi = await getProductsFromCategoryAndQuery('', searchProduct);
    if (!queryApi.results.length) {
      this.setState({
        emptyList: true,
      });
    } else {
      this.setState({
        productsList: queryApi.results,
        emptyList: false,
      });
    }
  };

  render() {
    const { categories, productsList, emptyList } = this.state;
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
          <Search
            handleApiQuery={ this.handleApiQuery || this.handleApiId }
            handleInput={ this.handleInput }
          />
          {emptyList
            ? <p>Nenhum produto foi encontrado</p>
            : <ProductCard productsList={ productsList } />}
        </div>
      </div>

    );
  }
}

export default Home;
