const { Before, Given, When, And, Then } = require('@cucumber/cucumber')
const assert = require('assert')

const Engine = require('../../app/lib/engine');
const Action = require('../../app/lib/action');
const Rule = require('../../app/lib/rule');

let engine;
let result;

Given('an Engine with no rules', function () {
  engine = new Engine();
});

Given('an Engine with this rules', function ( dataTable) {
  dataTable.rawTable.forEach( rule => engine.addRuleAction(
      new Rule(rule[0],rule[1],rule[2],rule[3]), new Action(rule[4], rule[5],rule[6],rule[7],rule[8],rule[9])
    )
  );
});

When('the Engine is asked for Actions', function () {
  result = engine.getAllActions();
});




      
When('the Engine receives a message {string} {string}', function (topic, value) {
  result = engine.processRuleAction(topic, value); 
});

Then('should the result be an empty array', function () {
  console.log(result);
  assert.equal(Array.isArray(result), true );
  assert.equal(result.length,0);
});


Then('should the result be an Action object', function () {
  assert.equal(result[0] instanceof Action, true )
});

Then('should the result has the topic {string}', function (topic) {
  assert.equal(result[0].topic, topic);
});

Then('should the result has the name {string}', function (name) {
    assert.equal(result[0].name, name);
});


/*
Then('should the result be a null value', function () {
  assert.equal(result,null);
});
       


Given('an Engine with no Actions', function () {
  engine = new Engine();
});
  */
     
/*When('the Engine is asked for the Action for {string} {string}', function (topic, value) {
  result = engine.matchAction(topic, value);
});
*/
   /*
When('the Engine creates an Action for {string} {string}', function (topic, value) {
  return 'pending';
});
  
*/
 
