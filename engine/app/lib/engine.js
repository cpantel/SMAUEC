const Activity = require('./activity');

class Engine {
  constructor () {
     this.rules = new Map();
  }

  match(topic,value) {
    if ( this.rules.has(topic+value) ) return new Activity();
    return null;
  }

  addRule(rule) {
    this.rules.set(rule.topic + rule.value, rule);
  }

  matchActivity(topic,value) {
    return null
  }
};

module.exports = Engine;
