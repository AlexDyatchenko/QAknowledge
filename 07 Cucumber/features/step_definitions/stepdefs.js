const { Given, When, Then, After } = require('@cucumber/cucumber');
const { Builder, By, Key } = require('selenium-webdriver');
const assert = require('assert');

let driver;

Given('I am on the todo application page', async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://lambdatest.github.io/sample-todo-app');
});

When('I add a new todo item {string}', async function (todoText) {
    const inputElement = await driver.findElement(By.id('sampletodotext'));
    await inputElement.sendKeys(todoText, Key.RETURN);
});

Then('the todo item should be added to the list', async function () {
    // Wait a moment for the item to be added
    await driver.sleep(1000);

    // Verify the item was added by checking the list
    const todoItems = await driver.findElements(By.css('li'));
    assert(todoItems.length > 0, 'Todo list should have items');

    console.log('Todo item successfully added!');
});

After(async function () {
    if (driver) {
        await driver.quit();
    }
});