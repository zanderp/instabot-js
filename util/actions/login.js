const { By, Key } = require('selenium-webdriver');
const { sendKeysToElement } = require('../util');
const logger = require('../logger/logger');
const { userName, password } = require('../../config/config');
const { randomInRange } = require('../util');
const selectors = require('../selectors');

/**
 * It finds the email input field, fills it with the username, waits 2 seconds, then fills the password
 * field, waits 2 seconds, then presses enter.
 */
async function fillAndLogin(driver) {
    await driver.findElement(By.className(selectors.loginFormSelector)).then(async function (emailInput) {
        sendKeysToElement(emailInput, userName);
        await driver.sleep(randomInRange(2000, 4000));
        sendKeysToElement(emailInput, Key.TAB + password);
        await driver.sleep(randomInRange(2000, 4000));
        sendKeysToElement(emailInput, Key.ENTER);
        await driver.sleep(randomInRange(2000, 4000));
        logger.log({
            level: 'info',
            message: 'Logged in successfully.',
        });
    }, function (err) {
        logger.log({
            level: 'error',
            message: 'Error logging in: ' + err,
        });
    });

    await driver.sleep(randomInRange(5000, 7000));
}

module.exports.fillAndLogin = fillAndLogin;
