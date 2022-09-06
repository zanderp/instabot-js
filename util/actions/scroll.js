const { By } = require('selenium-webdriver');
const { randomInRange } = require('../util');
const logger = require('../logger/logger');

/**
 * Scroll down to the bottom of the page
 * @param driver - the webdriver instance
 */
async function scrollDown(driver) {
    let intialLength = await driver.executeScript('return document.body.scrollHeight');

    while (true) {
        await driver.executeScript("window.scrollTo(0,document.body.scrollHeight)");
        try {
            await driver.sleep(randomInRange(4000, 6000));
            logger.log({
                level: 'info',
                message: 'Scrolled down.',
            });
        } catch (err) {
            logger.log({
                level: 'error',
                message: 'Error while scrolling down: ' + err,
            });
        }

        let currentLength = await driver.executeScript('return document.body.scrollHeight');
        if (intialLength == currentLength) {
            break;
        }
        intialLength = currentLength;
    }
    logger.log({
        level: 'info',
        message: 'Reached bottom of the page.',
    });

    await driver.sleep(randomInRange(2000, 4000));
}

module.exports.scrollDown = scrollDown;
