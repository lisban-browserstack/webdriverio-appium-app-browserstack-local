var path = require('path');
var assert = require('assert');

describe('BrowserStack Local Testing', () => {
  it('can check tunnel working', async () => {
    const el1 = await driver.$("accessibility id:12");
    await el1.click();
    const el2 = await driver.$("accessibility id:filter-btn");
    await el2.click();
    const el3 = await driver.$("-android uiautomator:new UiSelector().text(\"Samsung\")");
    await el3.click();
    await driver.pressKeyCode(4);
    const el4 = await driver.$("-android uiautomator:new UiSelector().text(\"Add to cart\")");
    await el4.click();
    const el5 = await driver.$("-android uiautomator:new UiSelector().text(\"\")");
    await el5.click();
    const el6 = await driver.$("-android uiautomator:new UiSelector().text(\"CHECKOUT\")");
    await el6.click();
  });
});
