Feature: Select color of the product
Background: Goto website
    Given I open React Storefront desired product page


    Scenario Outline: User is able to select desired color of product
        When I click <Colour> button 
        Then The color of the product will be changed accordingly
        Examples:
            | Product | Colour |
            | Product 1  | Red |
            | Product 8 | Green |