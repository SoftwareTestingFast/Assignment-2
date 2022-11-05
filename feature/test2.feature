Feature: User is able to increase the quantity of the desired product
Background: Goto Website
  Given I open React Storefront desired Category page
 
Scenario Outline: User is able to increase the quantity of the desired product
  When I click the desired <Product> increase button
  Then the <Quantity> of the product will be increased accordingly
Examples:  
  | Product | Quantity |
  | Product 1 | 8 |
  | Product 2 | 5 |

