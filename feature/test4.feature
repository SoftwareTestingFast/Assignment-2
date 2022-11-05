Feature: User is able to click the suggested products enlisted below the desired product
Background: Goto Website
  Given I open React Storefront desired Category page
 
Scenario Outline: User is able to click the suggested products enlisted below the desired product
  When I click on the desired <Product> 
  Then I should be able to select the <Suggested Product> from the products enlisted in the desired product page
Examples: 
  | Product | Suggested Product |
  | Product 1 | Product 3 |
  

  