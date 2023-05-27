import { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Categories from './Categories';
import Search from './Search';
import ProductCard from './ProductCard';
import { getCartSize, getSavedCart, saveCart } from '../helpers/localStorageCart';

class Home extends Component {
  state = {
    categories: [],
    productsList: [],
    searchProduct: '',
    cartSize: 0,
  };

  async componentDidMount() {
    const categorysApi = await getCategories();
    this.setState({ categories: categorysApi });
    const getCart = getCartSize();
    this.setState({ cartSize: getCart });
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
    const cart = productsList.map((prod) => {
      prod.quantity = 1;
      return prod;
    });
    saveCart(cart, id);
    const storageCart = getSavedCart();
    localStorage.setItem('cartSize', JSON.stringify(storageCart.length));
    this.setState({ cartSize: storageCart.length });
  };

  render() {
    const { categories, productsList, emptyList, cartSize } = this.state;
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
          <div className="carrinho-link-container">
            <Link
              to="/shoppingCart"
              data-testid="shopping-cart-Link"
            >
              Carrinho
            </Link>
            <Link
              to="/shoppingCart"
              data-testid="shopping-cart-size"
            >
              {cartSize}
            </Link>
          </div>

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

// Home.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired,
//   }).isRequired,
// };

export default Home;
