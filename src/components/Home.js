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
          handleApiQuery={ this.handleApiQuery }
          handleInput={ this.handleInput }
        />
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
