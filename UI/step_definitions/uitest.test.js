const { When, Then, Given } = require('@cucumber/cucumber')
const webdriver = require('selenium-webdriver');
const { By } = require('selenium-webdriver');

var driver = new webdriver.Builder().forBrowser('chrome').build();

//TEST 1
Given('I open React Storefront desired product page', { timeout: 60 * 1000 }, async () => {
   await driver.get('http://localhost:3000/p/1');
});

When('I click <add to cart> button', async () => {
   await driver.findElement(By.xpath("//*[@id=\"__next\"]/main/div/form/div[1]/div[2]/div/div[4]/button")).click()
});

Then('The product will be added to cart', async () => {
   await driver.findElement(By.className("MuiTypography-root makeStyles-name-268 MuiTypography-body1")).getText();
});

//TEST 2
Given('I open React Storefront category page', { timeout: 60 * 1000 }, async () => {
   await driver.get('http://localhost:3000/s/1');
});

When('I click <sort> button', async () => {
   await driver.findElement(By.xpath("//*[@id=\"__next\"]/main/div/div[2]/div[2]/div[4]/button")).click()
});

Then('I click <Price highest> option', async () => {
   await driver.findElement(By.xpath("/html/body/div[8]/div[3]/ul/li[2]")).click();
});

Then('The products will be sorted', async () => {
   var result = await driver.findElement(By.css("#item-8>div>div:nth-child(1)>a>div>img")).getAttribute('h6');

   if (result == "Product 9") {
      console.log("SUCCESSFUL")
   }
   else {
      console.log("FAILED")
   }
});

//TEST 3
Given('I open React Storefront desired subcategory page', { timeout: 60 * 1000 }, async () => {
   await driver.get('http://localhost:3000/s/1');
});

When('I click <Home> button', async () => {
   await driver.findElement(By.xpath("//*[@id=\"__next\"]/main/span/div/span[1]/a")).click()
});

Then('I will be directed to the home page', async () => {
   var title = await driver.getTitle();
   if (title == "React Storefront") {
      console.log("SUCCESSFUL");
   }
   else {
      console.log("FAILED")
   }
});