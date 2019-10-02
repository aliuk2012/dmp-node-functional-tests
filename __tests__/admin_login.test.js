// const { toMatchImageSnapshot } = require('jest-image-snapshot');

// expect.extend({ toMatchImageSnapshot });

describe('Logging into Admin', () => {
  beforeAll(async () => {
    await page.goto('https://www.preview.marketplace.team')
  });

  describe('Digital Market Home page', () => {
    it('should be titled "Digital Marketplace"', async () => {
      await expect(page.title()).resolves.toMatch('Digital Marketplace')
    })

    test('user can login',  async () => {
      //Screenshot our home page
      // const homePage = await page.screenshot({fullPage: true})
      // Do a visual regression test
      // expect(homePage).toMatchImageSnapshot()

      //Find login link and navigate to page
      await page.click('a[href="/user/login"]',{waitUntil: 'domcontentloaded'})

      await expect(page.title()).resolves.toMatch('Digital Marketplace')
      // Screenshot our login page
      // const loginPage = await page.screenshot({fullPage: true})
      // Do a visual regression test
      // expect(loginPage).toMatchImageSnapshot()
    })
  })
})
