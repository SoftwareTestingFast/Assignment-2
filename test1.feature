Feature: User is able to view the price of their desired product
Background: Goto Website
  Given I open React Storefront desired Category page
 
Scenario Outline: User is able to view the price of their desired product
 When I click on the desired <Product> 
Then I should be able to view the <Price> of that particular product
  Examples: 
  | Product | Price |
  | Product 1  | 10.99 |
  | Product 2 | 20.99 |