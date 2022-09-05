const { By } = require('selenium-webdriver');
let path = require('path');
const progressBar = require('progress-bar-cli');
const logger = require('../logger/logger');
const { isEmpty, randomInRange } = require('../util');
const { scrollDown } = require('../actions/scroll');
const { followersFilePath } = require('../../config/config');
const { saveContentToFile, getFileContent, emptyFile } = require('../file/file');

/**
 * It gets a list of likers profiles from a post and saves it to a file.
 */
async function getNotFollowingPostLikers(driver) {
    logger.log({
        level: 'info',
        message: 'Getting likers profiles links.',
    });
    var fileContent = await getFileContent(path.join(__dirname, followersFilePath));
    var postLikers = !isEmpty(fileContent) ? JSON.parse(fileContent) : [];
    logger.log({
        level: 'info',
        message: 'Current likers list: ' + postLikers,
    });
    var following = false;
    await driver.sleep(randomInRange(2000, 5000));

    await scrollDown(driver);
    await scrollDown(driver);
    await scrollDown(driver);

    driver.manage().setTimeouts({ implicit: 10000 });
    var xPath = '//div/div/div/div/div/div/div/div/div/section/main/div/div/div';

    await driver.findElements(By.xpath(xPath)).then(async function (elements) {
        await driver.sleep(4000);

        logger.log({
            level: 'info',
            message: 'Iterating through ' + elements.length + ' profiles.',
        });

        var counter = 1;
        let startTime = new Date();
        let loopLength = elements.length;
        let progressBarCounter = 0;

        for await (const element of elements) {
            progressBar.progressBar(progressBarCounter, loopLength, startTime);
            progressBarCounter++;
            var divNo = counter;

            await element.findElement(By.xpath('//div/div/div/div/div/div/div/div/div/section/main/div/div/div[' + divNo + ']/div[3]/button')).then(async function (subElement) {
                await subElement.getText().then(async function (text) {
                    if (text !== "Following") {
                        following = true;
                    }
                }, function (err) {
                    logger.log({
                        level: 'error',
                        message: 'Error getting follow text: ' + err,
                    });
                });
            }, function (err) {
                logger.log({
                    level: 'error',
                    message: 'Error getting follow button: ' + err,
                });
            });

            if (following) {
                await element.findElement(By.xpath('//div/div/div/div/div/div/div/div/div/section/main/div/div/div[' + divNo + ']/div/div/a')).then(async function (subElement) {
                    await subElement.getAttribute('href').then(function (href) {
                        postLikers.push(href);

                        logger.log({
                            level: 'info',
                            message: 'Got liker profile link: ' + href,
                        });
                    }, function (err) {
                        logger.log({
                            level: 'error',
                            message: 'Error getting liker profile link: ' + err,
                        });
                    });
                }, function (err) {
                    logger.log({
                        level: 'error',
                        message: 'Error getting link: ' + err,
                    });
                });

                await driver.sleep(randomInRange(100, 600));
            }

            counter++;
            following = false;
            await driver.sleep(randomInRange(2000, 4000));
        }
    }, function (err) {
        logger.log({
            level: 'error',
            message: 'Error getting elements: ' + err,
        });
    });
    driver.manage().setTimeouts({ implicit: 0 });
    await driver.sleep(randomInRange(2000, 4000));
    await emptyFile(path.join(__dirname, followersFilePath));
    await saveContentToFile(path.join(__dirname, followersFilePath), postLikers);
    logger.log({
        level: 'info',
        message: 'Got a list of likers profiles: ' + postLikers,
    });
}

/**
 * It scrolls down the page, finds all the likers of the post, and follows them.
 * @returns An array of strings.
 */
 async function followPostLikers(driver) {
    logger.log({
        level: 'info',
        message: 'Following the posts\'s likers.',
    });

    var following = false;
    await driver.sleep(randomInRange(2000, 4000));

    await scrollDown(driver);
    await scrollDown(driver);
    await scrollDown(driver);

    driver.manage().setTimeouts({ implicit: 10000 });
    var xPath = '//div/div/div/div/div/div/div/div/div/section/main/div/div/div';

    await driver.findElements(By.xpath(xPath)).then(async function (elements) {
        await driver.sleep(4000);

        logger.log({
            level: 'info',
            message: 'Iterating through ' + elements.length + ' profiles.',
        });

        var counter = 1;
        let startTime = new Date();
        let loopLength = elements.length;
        let progressBarCounter = 0;

        for await (const element of elements) {
            progressBar.progressBar(progressBarCounter, loopLength, startTime);
            progressBarCounter++;
            var divNo = counter;

            await element.findElement(By.xpath('//div/div/div/div/div/div/div/div/div/section/main/div/div/div[' + divNo + ']/div[3]/button')).then(async function (subElement) {
                await subElement.getText().then(async function (text) {
                    if (text !== "Following") {
                        following = true;
                    }
                }, function (err) {
                    logger.log({
                        level: 'error',
                        message: 'Error getting follow text: ' + err,
                    });
                });
            }, function (err) {
                logger.log({
                    level: 'error',
                    message: 'Error getting button: ' + err,
                });
            });

            if (following) {
                await driver.sleep(randomInRange(2000, 8000));
                await element.findElement(By.xpath('//div/div/div/div/div/div/div/div/div/section/main/div/div/div[' + divNo + ']/div[3]/button')).then(async function (subElement) {
                    await subElement.click();
                    logger.log({
                        level: 'info',
                        message: 'Followed profile: ' + divNo,
                    });
                }, function (err) {
                    logger.log({
                        level: 'error',
                        message: 'Error getting follow text: ' + err,
                    });
                });
            }

            counter++;
            following = false;
            await driver.sleep(randomInRange(2000, 4000));
        }
    }, function (err) {
        logger.log({
            level: 'error',
            message: 'Error getting elements: ' + err,
        });
    });

    driver.manage().setTimeouts({ implicit: 0 });
    await driver.sleep(randomInRange(2000, 4000));
    logger.log({
        level: 'info',
        message: 'Finished following the posts\'s likers.',
    });
}

module.exports.getNotFollowingPostLikers = getNotFollowingPostLikers;
module.exports.followPostLikers = followPostLikers;
