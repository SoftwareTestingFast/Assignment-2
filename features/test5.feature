Feature: Select color of the product
Background: Goto website
    Given I open React Storefront desired subcategory page


    Scenario Outline: User is able to select desired type of product
        When I click <type> type button 
        Then All the products will that <type> type will be displayed
        Examples:
            | Product | type |
            | Product 1  | new |
            | Product 5  | used |