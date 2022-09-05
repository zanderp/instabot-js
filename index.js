let driver = require('./util/browser/browser');
const logger = require('./util/logger/logger');
const { userName, baseUrl } = require('./config/config');
const { saveCookies, restoreCookies } = require('./util/cookies/cookies');
const { acceptCookies } = require('./util/actions/acceptCookies');
const { getPage, reloadPage } = require('./util/actions/pageNavigation');
const { openProfile } = require('./util/profile/profile');
const { fillAndLogin } = require('./util/actions/login');
const { followPostsLikers } = require('./util/actions/follow');

getPage(driver, baseUrl)
    .then(() => restoreCookies(driver))
    .then(() => reloadPage(driver))
    .then(() => acceptCookies(driver))
    .then(() => fillAndLogin(driver))
    .then(() => saveCookies(driver))
    .then(() => openProfile(driver, userName))
    .then(() => followPostsLikers(driver))
    .then(() => logger.log({
        level: 'info',
        message: 'Instabot JS tasks finished.',
    }));
