const { promises: fs } = require("fs");
const logger = require('../logger/logger');

/**
 * If the directory doesn't exist, create it
 * @param directory - The directory to check and create if it doesn't exist.
 */
function checkAndCreateDirectory(directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdir(directory, (err) => {
            if (err) {
                logger.log({
                    level: 'error',
                    message: 'Error creating directory: ' + directory,
                });
                return err;
            }
        });
    }
}

/**
 * GetFileContent returns a promise that resolves to the contents of the file at the specified path, or
 * rejects with an error if the file cannot be read.
 * @param filePath - The path to the file you want to read.
 * @param [encoding=utf-8] - The encoding to use. Defaults to utf8.
 * @returns A promise.
 */
async function getFileContent(filePath, encoding = "utf-8") {
    if (!filePath) {
        logger.log({
            level: 'error',
            message: 'filePath required',
        });
        throw new Error("filePath required");
    }

    return fs.readFile(filePath, { encoding });
}

/**
 * It takes a file path and content, and then appends the content to the file.
 * @param filePath - The path to the file you want to save the content to.
 * @param content - The content to be saved to the file.
 */
async function saveContentToFile(filePath, content) {
    await fs.appendFile(filePath, JSON.stringify(content), function (err, result) {
        if (err) console.log('error', err);
        if (result) console.log('result', result);
    });

    console.log('File saved: ' + filePath);
}

/**
 * It takes a file path as an argument and empties the file.
 * @param filePath - The path to the file you want to empty
 */
async function emptyFile(filePath) {
    await fs.truncate(filePath, 0, function () {
        console.log('Cleared cookie file')
    });
}

module.exports.checkAndCreateDirectory = checkAndCreateDirectory;
module.exports.getFileContent = getFileContent;
module.exports.saveContentToFile = saveContentToFile;
module.exports.emptyFile = emptyFile;
