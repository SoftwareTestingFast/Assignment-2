Feature: Navigate to the home button 
Background: Product page is opened
    Given I open React Storefront desired subcategory page

    Scenario: User is able to click add to cart button
        When I click <Home> button 
        Then I will be directed to the home page