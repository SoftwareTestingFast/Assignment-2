Feature: Remove from cart
Background: Goto website
    Given I open React Storefront cart page


    Scenario: User is able to click remove button
        When I click <remove> button 
        Then The product will be removed from cart