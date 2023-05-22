export async function getCategories() {
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  const resultApi = await fetch(URL);
  const data = await resultApi.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const URL_2 = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const resultApi = await fetch(URL_2);
  const data = await resultApi.json();
  return data;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
