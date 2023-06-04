import { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Categories from './Categories';
// import Search from './Search';
import ProductCard from './ProductCard';
import { getCartSize, getSavedCart, saveCart } from '../helpers/localStorageCart';
import Header from './Header';
import '../styles/Home.css';

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
        <aside>
          <Categories
            categories={ categories }
            handleApiId={ this.handleApiId }
          />
        </aside>
        <Header
          cartSize={ cartSize }
          onApiQuery={ this.handleApiQuery }
          handleSearch={ this.handleInput }
        />
        {/* <header>

          <div
            className="type-search flex justify-between
            bg-blue-800 p-2 w-full items-center "
          >
            <Search
              handleApiQuery={ this.handleApiQuery }
              handleInput={ this.handleInput }
            />
            <h1
              className="logo text-2xl font-bold text-center mt-2 text-white"
            >
              FrontEnd Online Store

            </h1>

            <Link
              to="/shoppingCart"
              data-testid="shopping-cart-size"
              className="text-2xl font-bold text-center
              text-white mt-2 mr-2 border-solid rounded-full
              p-1 w-10 h-10 bg-teal-500 hover:bg-teal-400"
            >
              {cartSize}
            </Link>

          </div>
        </header> */}
        <div className="homepage-container bg-gray-200 text-gray-950">
          <div>
            {emptyList
              ? (
                <p
                  className="text-center text-2xl font-bold text-gray-950 mt-10"
                >
                  Nenhum produto foi encontrado

                </p>)
              : (
                <ProductCard
                  productsList={ productsList }
                  addToCart={ this.addToCart }
                />)}
          </div>
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
