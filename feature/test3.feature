Feature: User is able to decrease the quantity of the desired product
Background: Goto Website
  Given I open React Storefront desired Category page
 
Scenario Outline: User is able to decrease the quantity of the desired product
  When I click the desired <Product> decrease button
  Then the <Quantity> of the product will be decreased accordingly
Examples:  
  | Product | Quantity |
  | Product 1 | 3 |
  | Product 2 | 2 |
