import { expect, type Locator, type Page } from '@playwright/test';

export class Cart {
    readonly page: Page;
    readonly productRow: Locator;
    readonly headerCells: Locator;
    readonly totalCartPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productRow = this.page.locator('#tbodyid tr');
        this.headerCells = this.page.locator('thead th');
        this.totalCartPrice = this.page.locator('#totalp');
    }

    async getColumnIndexByName(columnName: string) {
        const count = await this.headerCells.count();
        for (let i = 0; i < count; i++) {
            const text = await this.headerCells.nth(i).textContent();
            if (text?.trim().toLowerCase() === columnName.toLowerCase()) {
                return i;
            }
        }
        throw new Error(`Column with name "${columnName}" not found.`);
    }

    async getCartItemDetails() {
        const nameColumnIndex = await this.getColumnIndexByName('Title');
        const priceColumnIndex = await this.getColumnIndexByName('Price');
        const itemCount = await this.productRow.count();

        const products = [];

        for (let i = 0; i < itemCount; i++) {
            const row = this.productRow.nth(i);
            const name = (await row.locator(`td >> nth=${nameColumnIndex}`).textContent())?.trim() || '';
            const priceText = (await row.locator(`td >> nth=${priceColumnIndex}`).textContent())?.trim() || '';
            const price = parseFloat(priceText.replace(/[^\d.]/g, ''));

            products.push({ name, price });
        }
        return products;
    }

    async verifyItemsInCart(items: { name: string; price: number }[]) {
        const cartItems = await this.getCartItemDetails();
        expect(cartItems.length).toBe(items.length);
        expect(
            [...cartItems].sort((a, b) => a.name.localeCompare(b.name))
        ).toEqual(
            [...items].sort((a, b) => a.name.localeCompare(b.name))
        );

    }

    async verifyTotalCartPrice(price: number) {
        await expect(this.totalCartPrice).toHaveText(price.toString());
    }

}