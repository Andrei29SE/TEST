// const { Builder, By, Key, until } = require('selenium-webdriver')

// const chrome = require('selenium-webdriver/chrome')

// async function getWeather(city) {
//   let driver = await new Builder().forBrowser('chrome').build()
//   await driver.get(`https://www.google.com/search?q=weather+${city}`)

//   let temperature = await driver
//     .wait(until.elementLocated(By.id('wob_tm')))
//     .getText()
//   let condition = await driver
//     .wait(until.elementLocated(By.id('wob_dc')))
//     .getText()
//   await driver.quit()

//   return `${city}: ${temperature}°C, ${condition}`
// }

// async function main() {
//   let cities = ['London', 'Tokyo', 'Washington D.C.', 'Canberra', 'Brasília']
//   let weatherResults = []

//   for (let city of cities) {
//     let weather = await getWeather(city)
//     weatherResults.push(weather)
//   }

//   console.log(weatherResults)
// }

// main()

const { Builder, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const sleep = require('util').promisify(setTimeout) // Sleep function

// Constants (replace with your Multilogin credentials)
const MULTILOGIN_URL = 'https://app.multilogin.com/en/home/profiles'
const USERNAME = 'skiruta.andrei@mail.ru' // TODO: Add your Multilogin username
const PASSWORD = 'Andrei2904.' // TODO: Add your Multilogin password

async function launchQuickProfile() {
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build()

  try {
    // 1. Go to the Multilogin login page
    await driver.get(MULTILOGIN_URL)

    //  // 2. Wait for the login page to load and enter credentials
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
    await driver.findElement(By.className('sign-in-form-cta')).click() // Click the login button
    //
    // 3. Wait for the homepage to load after login
    await driver.wait(until.urlContains('/home/profiles'), 5000)

    // 4. Find and click the "Quick Profile" button
    await driver.wait(
      until.elementLocated(
        By.className('cds--btn cds--btn--tertiary ng-star-inserted')
      ),
      5000
    )
    const quickProfileButton = await driver
      .findElement(By.className('cds--btn cds--btn--tertiary ng-star-inserted'))
      .click()

    // 5. Wait for the Quick Profile to be created/launched
    console.log('Quick Profile launched.')
    await sleep(5000) // Wait for 5 seconds to ensure profile is created
    await driver.wait(
      until.elementLocated(By.className('cds--btn cds--btn--ghost')),
      5000
    )
    await driver.findElement(By.className('cds--btn cds--btn--ghost')).click()
  } catch (error) {
    console.error(`Error: ${error.message}`)
  } finally {
    // 6. Close the browser
    await driver.quit()
  }
}

// Run the script
launchQuickProfile()
