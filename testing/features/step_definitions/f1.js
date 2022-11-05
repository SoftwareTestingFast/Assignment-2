const { Given, Then, When, Before } = require('@cucumber/cucumber');

Given(/^I open the React Store Front$/, function () {
  return browser.navigateTo('http://localhost:3000');
});

Then(/^the title is "([^"]*)"$/, function (title) {
  return browser.assert.titleEquals(title);
});
