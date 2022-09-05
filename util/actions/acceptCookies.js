const { By } = require('selenium-webdriver');
const logger = require('../logger/logger');
const selectors = require('../selectors');
const { randomInRange } = require('../util');

/**
 * It clicks the "Accept Cookies" button on the Instagram login page.
 */
 async function acceptCookies(driver) {
    await driver.findElement(By.className(selectors.acceptCookiesButtonSelector)).then(function (allowButton) {
        allowButton.click();
        logger.log({
            level: 'info',
            message: 'Accepted cookies',
        });
    }, function (err) {
        if (err.state && err.state === 'no such element') {
            logger.log({
                level: 'error',
                message: 'Element not found',
            });
        }
    });
    await driver.sleep(randomInRange(2000, 4000));
}

module.exports.acceptCookies = acceptCookies;
