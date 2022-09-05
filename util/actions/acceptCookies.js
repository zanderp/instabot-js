const { By } = require('selenium-webdriver');
const logger = require('../logger/logger');
const selectors = require('../selectors');

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
    await driver.sleep(2000);
}

module.exports.acceptCookies = acceptCookies;
