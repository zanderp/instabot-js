/**
 * Send the keys to the element.
 * @param element - The element to send keys to.
 * @param keys - The keys you want to send to the element.
 */
function sendKeysToElement(element, keys) {
    element.sendKeys(keys);
}

/* A generator function that returns an async iterator. */
async function* asyncGenerator(numberOfPosts) {
    let i = 0;
    while (i < numberOfPosts) {
        yield i++;
    }
}

/**
 * It checks if the value is empty or not.
 * @param val - The value to be checked.
 * @returns The function isEmpty is being returned.
 */
let isEmpty = (val) => {
    let typeOfVal = typeof val;
    switch (typeOfVal) {
        case 'object':
            return (val.length == 0) || !Object.keys(val).length;
            break;
        case 'string':
            let str = val.trim();
            return str == '' || str == undefined;
            break;
        case 'number':
            return val == '';
            break;
        default:
            return val == '' || val == undefined;
    }
};

/**
 * If the random number is greater than the max, then call the function again. Otherwise, return the
 * random number.
 * @param min - The minimum number in the range.
 * @param max - The maximum number of the range.
 * @returns A random number between min and max.
 */
function randomInRange(min, max) {
    var n = Math.random() * (max - min + 0.1) + min;
    return n > max ? randomInRange(min, max) : n;
}

module.exports.sendKeysToElement = sendKeysToElement;
module.exports.asyncGenerator = asyncGenerator;
module.exports.isEmpty = isEmpty;
module.exports.randomInRange = randomInRange;
