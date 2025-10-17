import { expect, type Locator, type Page } from '@playwright/test';
import { waitForApiResponse } from '../utils/utilFunctions';

export class Navigation {
    readonly page: Page;
    readonly cartLink: Locator;
    readonly loginLink: Locator;
    readonly logoutLink: Locator;
    readonly loggedInUserName: Locator;

    //login modal locators
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = this.page.locator('#cartur');
        this.loginLink = this.page.locator('#login2');
        this.logoutLink = this.page.locator('#logout2');
        this.loggedInUserName = this.page.locator('#nameofuser');

        //login modal locators
        this.usernameInput = this.page.locator('#loginusername');
        this.passwordInput = this.page.locator('#loginpassword');
        this.submitButton = this.page.locator("button:has-text('Log in')");
    }

    async openHomePage() {
        await this.page.goto('https://www.demoblaze.com/index.html');
    }

    async clickNavigationLink(linkName: string) {
        switch (linkName.toLowerCase()) {
            case 'cart':
                await this.cartLink.click();
                break;
            case 'login':
                await this.loginLink.click();
                break;
            case 'logout':
                await this.logoutLink.click();
                break;
            default:
                throw new Error(`Navigation link "${linkName}" not found.`);
        }
    }

    async login(username: string, password: string) {
        await this.clickNavigationLink('login');
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async verifyLoggedInUser(username: string) {
        await expect(this.loggedInUserName).toHaveText(`Welcome ${username}`);
    }

    async verifyUserIsLoggedOut() {
        await expect(this.loginLink).toBeVisible();
        await expect(this.logoutLink).toBeHidden();
        await expect(this.loggedInUserName).toBeHidden();
    }
}