import { test as setup } from '@playwright/test';
import { Home } from '../pageobjects/home';
import { Navigation } from '../pageobjects';

setup(`user login`, async ({ page }) => {
    const username = "playwrighttesting@example.com";
    const password = "password";

    const home = new Home(page);
    await home.openHomePage();

    const navigation = new Navigation(page);
    await navigation.login(username, password);
    await navigation.verifyLoggedInUser(username);
    await page.context().storageState({ path: 'utils/auth.json' });
});