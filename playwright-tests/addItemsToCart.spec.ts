import { test, expect } from '@playwright/test';
import { Home, Navigation, Product, Cart } from '../pageobjects/';

//test.use({ storageState: 'utils/auth.json' });

test('add item to cart', async ({ page }) => {
  const productName = 'Sony vaio i5';

  const home = new Home(page);
  await home.openHomePage();
  await home.clickProduct(productName);

  const productPage = new Product(page);
  await productPage.addItemToCart(productName);
  const productPrice = await productPage.getProductPrice();

  const navigation = new Navigation(page);
  await navigation.clickNavigationLink('Cart');

  const cart = new Cart(page);
  await cart.verifyTotalCartPrice(productPrice);
  await cart.verifyItemsInCart([{ name: productName, price: productPrice }]);
});

test('add item to cart multiple times', async ({ page }) => {
  const productName = 'Samsung galaxy s6';

  const home = new Home(page);
  await home.openHomePage();
  await home.clickProduct(productName);

  const productPage = new Product(page);
  await productPage.addItemToCart(productName);
  await productPage.addItemToCart(productName);
  const productPrice = await productPage.getProductPrice();

  const navigation = new Navigation(page);
  await navigation.clickNavigationLink('Cart');

  const cart = new Cart(page);
  await cart.verifyTotalCartPrice(productPrice * 2);
  await cart.verifyItemsInCart([{ name: productName, price: productPrice }, { name: productName, price: productPrice }]);
});

test('add multiple items to cart', async ({ page }) => {
  const productNames = ['Samsung galaxy s6', 'Sony vaio i5']

  const products: { name: string; price: number }[] = [];
  let totalPrice = 0;

  for (const productName of productNames) {
    const home = new Home(page);
    await home.openHomePage();
    await home.clickProduct(productName);

    const productPage = new Product(page);
    await productPage.addItemToCart(productName);
    const productPrice = await productPage.getProductPrice();
    products.push({ name: productName, price: productPrice });
    totalPrice += productPrice;
  }

  const navigation = new Navigation(page);
  await navigation.clickNavigationLink('Cart');

  const cart = new Cart(page);
  await cart.verifyTotalCartPrice(totalPrice);
  await cart.verifyItemsInCart(products);
});
