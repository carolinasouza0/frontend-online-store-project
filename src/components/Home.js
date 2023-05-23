import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Categories from './Categories';
import Search from './Search';
import ProductCard from './ProductCard';
import { saveCart } from '../helpers/localStorageCart';

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

  handleApiId = async (id) => {
    const idApi = await getProductsFromCategoryAndQuery(id, '');
    this.setState({
      productsList: idApi.results,
    });
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

  addToCart = (id) => {
    const { productsList } = this.state;
    saveCart(productsList, id);
    // console.log(teste);
  };

  render() {
    const { categories, productsList, emptyList } = this.state;
    return (
      <div>
        <Categories
          categories={ categories }
          handleApiId={ this.handleApiId }
        />
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
            handleApiQuery={ this.handleApiQuery }
            handleInput={ this.handleInput }
          />
          {emptyList
            ? <p>Nenhum produto foi encontrado</p>
            : <ProductCard productsList={ productsList } addToCart={ this.addToCart } />}
        </div>
      </div>

    );
  }
}

export default Home;
