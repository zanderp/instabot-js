const logger = require('../logger/logger');
const { randomInRange } = require('../util');

/**
 * It opens a page, waits for 2 seconds, and then logs the page that was opened.
 * @param driver - The webdriver object
 * @param page - The URL of the page you want to open.
 */
async function getPage(driver, page) {
    await driver.get(page);

    logger.log({
        level: 'info',
        message: 'Page opened: ' + page,
    });

    driver.sleep(randomInRange(2000, 4000));
}

/**
 * It navigates to a page, logs the navigation, and waits 4 seconds.
 * @param driver - The webdriver instance
 * @param page - The URL of the page you want to navigate to.
 */
async function navigateToPage(driver, page) {
    await driver.navigate().to(page);

    logger.log({
        level: 'info',
        message: 'Navigated to page: ' + page,
    });

    driver.sleep(randomInRange(2000, 4000));
}

/**
 * This function reloads the page and waits for 4 seconds before continuing.
 * @param driver - The webdriver instance.
 */
async function reloadPage(driver) {
    await driver.navigate().refresh();

    logger.log({
        level: 'info',
        message: 'Page reloaded successfully.',
    });

    driver.sleep(randomInRange(4000, 6000));
}

module.exports.getPage = getPage;
module.exports.navigateToPage = navigateToPage;
module.exports.reloadPage = reloadPage;
