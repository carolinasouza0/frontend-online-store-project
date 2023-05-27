export const getSavedCart = () => {
  const cartProducts = localStorage.getItem('shoppingCart');
  return cartProducts ? JSON.parse(cartProducts) : [];
};

export const saveCart = (list, id) => {
  const cartProducts = getSavedCart();
  const newCartProducts = list.find((elem) => elem.id === id);
  localStorage
    .setItem('shoppingCart', JSON.stringify([...cartProducts, newCartProducts]));
};

export const getSavedComments = (id) => {
  const evaluation = localStorage.getItem(id);
  return evaluation ? JSON.parse(evaluation) : [];
};

export const savedComents = ({ email, text, rating, productId }) => {
  const savedEvaluation = getSavedComments(productId);
  const newItem = { email, text, rating };
  const newItems = [...savedEvaluation, newItem];
  localStorage
    .setItem(productId, JSON.stringify(newItems));
};

export const getCartSize = () => {
  const cartSize = localStorage.getItem('cartSize');
  return cartSize ? JSON.parse(cartSize) : [];
};
