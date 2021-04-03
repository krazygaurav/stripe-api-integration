const Stripe = require("stripe");

const stripe = Stripe("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

async function listAllProducts() {
  const products = await stripe.products.list();

  console.log(products);
}

listAllProducts();

async function getSingleProduct() {
  const product = await stripe.products.retrieve("prod_IzCf4GGKyKizmm");

  console.log(product);
}

getSingleProduct();
