require('dotenv').config();

module.exports.userName = process.env.USER_NAME;
module.exports.password = process.env.PASSWORD;
module.exports.cookiePath = process.env.COOKIE_PATH;
module.exports.numberOfPosts = process.env.NUMBER_OF_POSTS;
module.exports.headless = parseInt(process.env.HEADLESS);
module.exports.baseUrl = process.env.BASE_URL;
module.exports.followersFilePath = process.env.FOLLOWERS_FILE_PATH;
