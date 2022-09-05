const { By } = require('selenium-webdriver');
const logger = require('../logger/logger');
const { scrollDown } = require('../actions/scroll');
const { asyncGenerator, randomInRange } = require('../util');
const { navigateToPage } = require('../actions/pageNavigation');
const { numberOfPosts, baseUrl } = require('../../config/config');

/**
 * Open the profile of the user whose username is stored in the variable userName.
 */
async function openProfile(driver, userName) {
    await navigateToPage(driver, baseUrl + userName + '/');
    await driver.sleep(randomInRange(2000, 4000));
    logger.log({
        level: 'info',
        message: 'Profile opened: ' + userName,
    });
    await driver.sleep(randomInRange(2000, 4000));
}

/**
 * It's a function that returns a list of links to posts on a page.
 * @returns a promise.
 */
async function getProfilePostsLinks(driver) {
    logger.log({
        level: 'info',
        message: 'Getting profile posts links.',
    });

    await scrollDown(driver);
    await driver.sleep(randomInRange(4000, 6000));

    var postLinks = [];

    for await (const num of asyncGenerator(numberOfPosts)) {
        var divNo = num + 1;
        var xPath = '//div/div/div/div[1]/div/div/div[1]/section/main/div[1]/div[2]/article/div/div/div[' + divNo + ']/div[1]/a';
        await driver.findElement(By.xpath(xPath)).then(async function (element) {
            await element.getAttribute('href').then(function (href) {
                logger.log({
                    level: 'info',
                    message: 'Got profile post link: ' + href,
                });

                postLinks.push(href);
            });
        }, function (err) {
            logger.log({
                level: 'error',
                message: 'Error getting link: ' + err,
            });
        });
    }

    await driver.sleep(randomInRange(2000, 4000));
    logger.log({
        level: 'info',
        message: 'Got posts links: ' + JSON.stringify(postLinks),
    });

    await driver.sleep(randomInRange(2000, 4000));
    return postLinks;
}

module.exports.openProfile = openProfile;
module.exports.getProfilePostsLinks = getProfilePostsLinks;
