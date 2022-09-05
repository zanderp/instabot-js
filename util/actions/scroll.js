async function scrollDown(driver) {
    driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
    await driver.sleep(2000);
}

module.exports.scrollDown = scrollDown;
