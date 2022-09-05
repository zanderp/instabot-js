const { randomInRange } = require('../util');

/**
 * Scroll down to the bottom of the page
 * @param driver - the webdriver instance
 */
async function scrollDown(driver) {
    driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
    await driver.sleep(randomInRange(2000, 4000));
}

module.exports.scrollDown = scrollDown;
