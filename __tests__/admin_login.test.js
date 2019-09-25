describe('Logging into Admin', () => {
  beforeAll(async () => {
    await page.goto('http://localhost')
  });

  describe('Digital Market Home page', () => {
    it('should be titled "Digital Marketplace"', async () => {
      await expect(page.title()).resolves.toMatch('Digital Marketplace')
    })

    test('user can login',  async () => {
      //Screenshot our home page
      await page.screenshot({path: 'screenshot.png'})
      //Find and click login
      await page.click('a[href="/user/login"]')
      await page.waitForSelector('.button-save')
      await expect(page.title()).resolves.toMatch('Digital Marketplace')
      // Screenshot our login page
      await page.screenshot({path: 'screenshot1.png'})

    })
  })
})
