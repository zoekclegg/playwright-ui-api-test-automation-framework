import { type Locator, type Page } from '@playwright/test';

export class Home {
    readonly page: Page;
    readonly productTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTitle = this.page.locator('.card-title');
    }

    async openHomePage() {
        await this.page.goto('https://www.demoblaze.com/index.html');
    }

    async clickProduct(productName: string) {
        const product = this.productTitle.filter({ hasText: productName });
        await product.click();
    }
}