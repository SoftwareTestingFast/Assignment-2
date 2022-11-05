Feature: User is able to click on showmore to view more products from the Category page
Background: Goto Website
  Given I open React Storefront desired Category page
 
Scenario: User is able to click on showmore to view more products from the Category page
  When I click on the show more button
  Then I should be able to view more products on the category page
