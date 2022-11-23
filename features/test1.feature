Feature: Rating the product
Background: Goto website
    Given I open React Storefront desired product page


    Scenario Outline: clicking star option button
        When I click 3 star button 
        Then The result should be 3 stars
        Examples:
            | Product | rating |
            | Product 1  | 5 |
            | Product 3 | 4 |