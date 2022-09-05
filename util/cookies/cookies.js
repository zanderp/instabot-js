const { cookiePath } = require('../../config/config');
const logger = require('../logger/logger');
const { getFileContent } = require('../file/file');
const { promises: fs } = require("fs");
var path = require('path');

/**
 * Add a cookie to the browser's cookie jar.
 * @param driver - The driver object that you created in the previous step.
 * @param cookie - The cookie to add.
 */
async function addCookie(driver, cookie) {
    await driver.manage().addCookie(cookie);
    logger.log({
        level: 'info',
        message: 'Added cookie: ' + JSON.stringify(cookie),
    });
}

/**
 * It saves the cookies from the current session to a file.
 * @param driver - The webdriver instance
 */
async function saveCookies(driver) {
    await getCookies(driver).then(async function (cookies) {
        await fs.truncate(path.join(__dirname, cookiePath), 0, function () {
            console.log('Cleared cookie file')
        });
        await fs.writeFile(path.join(__dirname, cookiePath), JSON.stringify(cookies), function (err, result) {
            if (err) {
                logger.log({
                    level: 'error',
                    message: 'Error writing cookie: ' + err,
                });
            }
            if (result) {
                logger.log({
                    level: 'info',
                    message: 'Save Cookies Result: ' + result,
                });
            }
        });

        logger.log({
            level: 'info',
            message: 'Saved Cookies',
        });
    });

    await driver.sleep(2000);
}

/**
 * Get the cookies from the browser and return them as an array of objects.
 * @param driver - the webdriver instance
 * @returns An array of objects.
 */
async function getCookies(driver) {
    let data;
    try {
        data = await driver.manage().getCookies().then(function (cookies) {
            return cookies;
        });
    } catch (err) {
        logger.log({
            level: 'error',
            message: 'Error getting cookies: ' + err,
        });
    }

    logger.log({
        level: 'info',
        message: 'Fetched cookies from browser',
    });

    return data;
}

/**
 * Restore cookies from a file and add them to the browser.
 * @param driver - The webdriver instance
 */
async function restoreCookies(driver) {
    try {
        const cookies = await getFileContent(path.join(__dirname, cookiePath));

        await driver.sleep(3000);
        for (var key in JSON.parse(cookies)) {
            addCookie(driver, JSON.parse(cookies)[key]);
        }
    } catch (err) {
        logger.log({
            level: 'error',
            message: 'Error restoring cookie: ' + err,
        });

        return;
    }

    logger.log({
        level: 'info',
        message: 'Cookies restored successfully',
    });

    await driver.sleep(3000);
}

module.exports.addCookie = addCookie;
module.exports.saveCookies = saveCookies;
module.exports.getCookies = getCookies;
module.exports.restoreCookies = restoreCookies;