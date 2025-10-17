import type { Locator, Page } from '@playwright/test';

export class Product {
    readonly page: Page;
    readonly productPrice: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = this.page.locator("a:has-text('Add to cart')");
        this.productPrice = this.page.locator('.price-container');
    }

    async addItemToCart(productName: string) {
        await this.addToCartButton.click();
        await this.page.waitForTimeout(3000); // wait for alert to appear
        this.page.on('dialog', dialog => {
            dialog.accept();
        });
    }

    async getProductPrice() {
        const priceText = await this.productPrice.textContent();
        if (!priceText) {
            throw new Error('Product price not found');
        }
        const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
        return price;
    }
}