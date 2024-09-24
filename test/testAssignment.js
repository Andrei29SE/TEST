const { Builder, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

async function getWeather(city) {
  let driver = await new Builder().forBrowser('chrome').build()
  await driver.get(`https://www.google.com/search?q=weather+${city}`)

  let temperature = await driver
    .wait(until.elementLocated(By.id('wob_tm')), 5000)
    .getText()
  let condition = await driver
    .wait(until.elementLocated(By.id('wob_dc')), 5000)
    .getText()
  await driver.quit()

  return `${city}: ${temperature}°C, ${condition}`
}

async function main() {
  let cities = ['London', 'Tokyo', 'Washington D.C.', 'Canberra', 'Brasília']
  let weatherResults = []

  for (let city of cities) {
    let weather = await getWeather(city)
    weatherResults.push(weather)
  }

  console.log(weatherResults)
}

main()
