import type { Page } from '@playwright/test';

export const waitForApiResponse = async (page: Page, url: string, method: string, status: number, timeout: number = 10000) => {
    const urlPattern = new RegExp(url);
    return await page.waitForResponse(async (response) =>
        urlPattern.test(response.request().url()) &&
        response.request().method() === method &&
        response.status() === status,
        { timeout }
    );
};