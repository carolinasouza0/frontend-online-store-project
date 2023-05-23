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
