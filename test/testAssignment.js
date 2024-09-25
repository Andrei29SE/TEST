const { Builder, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const MULTILOGIN_URL = 'https://app.multilogin.com/en/home/profiles'
const USERNAME = 'skiruta.andrei@mail.ru'
const PASSWORD = 'Andrei2904.'

// 1 Launch Chrom and go to Multilogin sign in page

async function launchQuickProfile() {
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build()

  //  2 Signining in (typing password and login tnen click Login button)
  try {
    await driver.get(MULTILOGIN_URL)

    await driver.wait(
      until.elementLocated(
        By.className(
          'cds--text-input cds--text-input--md cds--layout--size-md ng-untouched ng-pristine ng-invalid ng-star-inserted'
        )
      ),
      5000
    )
    await driver
      .findElement(
        By.className(
          'cds--text-input cds--text-input--md cds--layout--size-md ng-untouched ng-pristine ng-invalid ng-star-inserted'
        )
      )
      .sendKeys(USERNAME)
    await driver
      .findElement(
        By.className(
          'ng-untouched ng-pristine ng-valid cds--text-input cds--text-input--md cds--layout--size-md ng-star-inserted'
        )
      )
      .sendKeys(PASSWORD)
    await driver.findElement(By.className('sign-in-form-cta')).click()

    // 3 Find and click Quick profile then clicck Launch(without chanching default settings)

    await driver.wait(until.urlContains('/home/profiles'), 5000)
    await driver.wait(
      until.elementLocated(
        By.className('cds--btn cds--btn--tertiary ng-star-inserted')
      ),
      5000
    )
    const quickProfileButton = await driver
      .findElement(By.className('cds--btn cds--btn--tertiary ng-star-inserted'))
      .click()

    console.log('Quick Profile launched.')

    await driver.wait(
      until.elementLocated(
        By.xpath(
          '/html/body/app-root/ibm-placeholder/app-quick-profile-form/ibm-modal/cds-overlay/section/div/ibm-modal-footer/footer/button[2]'
        )
      ),
      5000
    )
    await driver
      .findElement(
        By.xpath(
          '/html/body/app-root/ibm-placeholder/app-quick-profile-form/ibm-modal/cds-overlay/section/div/ibm-modal-footer/footer/button[2]'
        )
      )
      .click()

    // 4 Searching weather in 5  capital cities

    async function getWeather(city) {
      let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options())
        .build()
      await driver.get(`https://www.google.com/search?q=weather+${city}`)

      //  4 Found elements on the weather app and got their value (tempr and conditions)

      let temperature = await driver
        .wait(until.elementLocated(By.id('wob_tm')))
        .getText()
      let condition = await driver
        .wait(until.elementLocated(By.id('wob_dc')))
        .getText()
      await driver.quit()
      return `${city}: ${temperature}°C, ${condition}`
    }

    // 5 Push results in the new array

    async function main() {
      let cities = [
        'London',
        'Tokyo',
        'Washington D.C.',
        'Canberra',
        'Brasília',
      ]

      let weatherResults = []
      for (let city of cities) {
        let weather = await getWeather(city)
        weatherResults.push(weather)
      }
      console.log(weatherResults)
    }
    main()
  } catch (error) {
    console.error(`Error: ${error.message}`)
  } finally {
    await driver.quit()
  }
}

launchQuickProfile()
