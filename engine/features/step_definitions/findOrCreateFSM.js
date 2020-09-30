const { Before, Given, When, And, Then } = require('@cucumber/cucumber')
const assert = require('assert')

const Engine = require('../../app/lib/engine');
const Activity = require('../../app/lib/activity');
const Action = require('../../app/lib/action');
const Rule = require('../../app/lib/rule');

let engine;
let result;

Given('an Engine with no rules', function () {
  engine = new Engine();
});

Given('an Engine with this rules', function ( dataTable) {
  dataTable.rawTable.forEach( rule => engine.addRule(
      new Rule(rule[0],rule[1],rule[2],rule[3]), new Action(rule[4], rule[5],rule[6],rule[7],rule[8])
    )
  );
});
      
When('the Engine is asked for the Rule {string} {string}', function (topic, value) {
  result = engine.matchRule(topic, value); 
});

Then('should the result be a null value', function () {
  assert.equal(result,null);
});
       
Then('should the result be an Action object', function () {
  assert.equal(result instanceof Action, true )
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
  
Then('should the result Action be named {string}', function (name) {
  assert.equal(result.name, name);
});
 
