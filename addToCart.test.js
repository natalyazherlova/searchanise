
async function login(page) {
    const enterUsingPassword = '.password-link'
    const password = 'reiffu'
    const passwordField = '#Password'
    const enterPassword = '#login_form > button'
    await expect(page).toClick(enterUsingPassword);
    await page.type(passwordField, password);
    await expect(page).toClick(enterPassword);
    await page.waitForTimeout(3000);
    await expect(page).toMatch('Natlova Shop');
}

describe('add to cart', () => {
    beforeAll(async () => {
        jest.setTimeout(50000);
        await page.goto('https://natlova.myshopify.com/');
    });

    it('should be checked', async () => {
        const menuSelector = '#Details-menu-drawer-container > summary > span';
        const addToCartSelector = '.product-form__submit';
        const viewMyCartSelector = '#cart-notification-button';
        
        await login(page);
        
        //go to products, pick a random one and add it to cart
        await expect(page).toClick(menuSelector);
        await page.waitForTimeout(1000);
        await expect(page).toClick('a', { text: 'Catalog' })
        await page.waitForTimeout(1000);
        await expect(page).toMatch('Products');
        const products = await page.$$('#product-grid > li');
        const randomNumber = Math.floor(Math.random() * products.length) + 1;
        const randomProduct = await page.$(`#product-grid > li:nth-child(${randomNumber})`);
        await randomProduct.click();
        await page.waitForTimeout(1000);
        const pageUrl = page.url();
        const [, productID] = pageUrl.match(/.*\/products\/([a-z\-0-9]*)(\?.*)?/i);
        await expect(page).toClick(addToCartSelector);
        await page.waitForTimeout(1000);
        await expect(page).toMatch('Item added to your cart');

        //check if it's actually added
        await expect(page).toClick(viewMyCartSelector);
        await page.waitForTimeout(1000);
        await expect(page).not.toMatch('empty');
        const itemInCart = await page.evaluate(() => document.querySelector('.cart-item__name').href);
        const [, productFromCartID] = itemInCart.match(/.*\/products\/([a-z\-0-9]*)(\?.*)?/i);
        
        await expect(productFromCartID).toEqual(productID);

    });
});