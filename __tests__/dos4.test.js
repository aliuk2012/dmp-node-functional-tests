describe('Digital Outcomes and Specialists 4', () => {
  beforeAll(async () => {
    await page.goto('https://www.preview.marketplace.team')
  });

  it('is open for applications', async () => {
    await expect(page).toMatch('Digital Outcomes and Specialists 4 is open for applications')
  })
})
