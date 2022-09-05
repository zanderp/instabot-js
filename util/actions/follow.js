const { randomInRange } = require('../util');
const { getProfilePostsLinks } = require('../profile/profile');
const { getNotFollowingPostLikers, followPostLikers } = require('../posts/likers');
const { navigateToPage } = require('../actions/pageNavigation');

/**
 * It gets a list of links, navigates to each link, gets the likers of the post, and follows them.
 */
async function followPostsLikers(driver) {
    const links = await getProfilePostsLinks(driver);
    for await (const link of links) {
        await driver.sleep(randomInRange(2000, 4000));
        await navigateToPage(driver, link + 'liked_by/');
        await driver.sleep(randomInRange(2000, 5500));
        await getNotFollowingPostLikers(driver);
        await followPostLikers(driver);
        process.exit(1);
    }
}

module.exports.followPostsLikers = followPostsLikers;
