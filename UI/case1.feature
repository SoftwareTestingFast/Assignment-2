Feature: Add product to cart
Background: Product page is opened
    Given I open React Storefront desired product page

    Scenario: User is able to click add to cart button
        When I click <add to cart> button 
        Then The product will be added to cart