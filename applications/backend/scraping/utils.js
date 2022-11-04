const closeCookiesModal = async (page) => {
  const cookiesCloseElementSelector = `#onetrust-close-btn-container > a`
  if ((await page.$(cookiesCloseElementSelector)) !== null) {
    await page.click(cookiesCloseElementSelector)
  }
}

export { closeCookiesModal }
