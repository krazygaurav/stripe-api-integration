const axios = require("axios");

const SERVICE_URL = process.env.STORE_SERVICE_API;

const getProduct = async (productId) => {
  const { data } = await axios.get(`${SERVICE_URL}/products/${productId}`);
  return data;
};

const getCartItems = async (userId) => {
  const { data } = await axios.get(`${SERVICE_URL}/carts/user/${userId}`);
  const cartItems = data[0].products.map(
    async (product) => await getProduct(product.productId)
  );
  const products = await Promise.all(cartItems);

  let amount = 0;

  products.forEach((product) => {
    amount += product.price;
  });

  return { products, amount };
};

module.exports = { getCartItems, getProduct };
