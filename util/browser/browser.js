const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const { geckoDriverPath, headless } = require('../../config/config');
const logger = require('../logger/logger');

/* Creating a new instance of the Firefox browser. */
let options = new firefox.Options();
options.setPreference('devtools.jsonview.enabled', false);

if (headless) {
    options.addArguments('--headless');
}

let driver = new Builder()
    .forBrowser('firefox')
    .withCapabilities(options)
    .build();

logger.log({
    level: 'info',
    message: 'Instabot JS started successfully.',
});

module.exports = driver;
