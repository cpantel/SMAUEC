const { Before, Given, When, And, Then } = require('@cucumber/cucumber')
const assert = require('assert')
const Engine = require('../../app/lib/engine');
const Activity = require('../../app/lib/activity');

let engine;
let result;

Given('an Engine with no rules', function () {
  engine = new Engine();
});

Given('an Engine with this rules', function ( dataTable) {
  dataTable.rawTable.forEach( rule => engine.addRule({"topic":rule[0], "value":rule[1]}));
});
      
When('the Engine is asked for the Rule {string} {string}', function (topic, value) {
  result = engine.match(topic, value); 
});

Then('should the result be a null value', function () {
  assert.equal(result,null);
});
       
Then('should the result be an Activity object', function () {
  assert.equal(result instanceof Activity, true )
});


Given('an Engine with no Activities', function () {
  engine = new Engine();
});
       
When('the Engine is asked for the Activity for {string} {string}', function (topic, value) {
  result = engine.matchActivity(topic, value);
});
   
When('the Engine creates an Activity for {string} {string}', function (topic, value) {
           return 'pending';
});
   
