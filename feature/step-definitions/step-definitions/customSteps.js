const {When, Then, Given, Before, After} = require('@cucumber/cucumber') 
const webdriver = require('selenium-webdriver');
const {By} = require('selenium-webdriver');

let driver;
Before(function(){
    driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
});

//Test-01
Given('I open React Storefront desired Category page',{timeout: 60 * 1000} , async() =>  {
    await driver.get('http://localhost:3000/s/1');
});

When('I click on the desired Product {int}', async (int) => {
   await driver.findElement(By.xpath("//img[@alt='Product 1']")).click();
});

Then('I should be able to view the {float} of that particular product', async (float) =>{
    await driver.findElement(By.className("MuiTypography-root MuiTypography-body1")).getText();
 });

//Test-02
When('I click the desired Product {int} increase button', async (int) => {
    await driver.findElement(By.xpath("//img[@alt='Product 1']")).click();
});
Then('the {int} of the product will be increased accordingly',{timeout: 60 * 1000}, async (int) => {
    let element = null;
    for (var i = 0; i < 8 ; i++  ){
        try {
            element = await driver.findElement(By.className("MuiButtonBase-root MuiIconButton-root RSFQuantitySelector-input-635 root subtract add input"));
        
      
    
    await element.click();
    await driver.findElement(By.name("quantity")).getSize();
    await driver.sleep(6000);
        }
        

        catch (error) {
            element = null;
        }
    }
});
//Test-03
When('I click the desired Product {int} decrease button', async (int) => {
    await driver.findElement(By.xpath("//img[@alt='Product 1']")).click();
});
Then('the {int} of the product will be decreased accordingly',{timeout: 60 * 1000}, async (int) => {
    let element = null;
    for (var i = 0; i < 5 ; i++  ){
        try {
            element = await driver.findElement(By.className("MuiButtonBase-root MuiIconButton-root RSFQuantitySelector-input-635 root subtract add input"));
        
      
    
    await element.click();
    await driver.sleep(6000);
        }
        
        catch (error) {
            element = null;
        }
    }
    for (var i = 5; i > 0 ; --i  ){
        try {
            element = await driver.findElement(By.className("MuiButtonBase-root MuiIconButton-root RSFQuantitySelector-input-635 root subtract add input"));
        
      
    
    await element.click();
    await driver.sleep(6000);
        }
        
        catch (error) {
            element = null;
        }
    }
});
 //Test-04
 Then('I should be able to select the Product {int} from the products enlisted in the desired product page', {timeout: 60 * 1000}, async(int) => {
 
    await driver.findElement(By.xpath("//img[@alt='Product 3']")).click();
 });
 //Test-05
 When('I click on the show more button', async() => {
   await driver.findElement(By.xpath("//span[normalize-space()='Show More']")).click();
});

  Then('I should be able to view more products on the category page', async() =>{
    
  });



