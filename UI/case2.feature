Feature: Sort the products
Background: Product page is opened
    Given I open React Storefront products page

    Scenario: 
        When I click <sort> button 
        Then I click <Price highest> option
        Then The products will be sorted