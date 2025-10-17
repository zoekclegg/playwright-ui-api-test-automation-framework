import { test } from '@playwright/test';
import { Home, Navigation } from '../pageobjects/';

test.use({ storageState: 'utils/auth.json' });

test('user can log out', async ({ page }) => {
    const home = new Home(page);
    await home.openHomePage();
    const navigation = new Navigation(page);
    await navigation.clickNavigationLink('logout');
    await navigation.verifyUserIsLoggedOut();
});
