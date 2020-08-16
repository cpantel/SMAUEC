var uuid = require('uuid');

exports.initial = (eventClass, activityClass) => {
  var timestamp = Date.now();

  var evt = new eventClass({ _id: uuid.v4(), topic: '/topic1', value:'on', 'timestamp':timestamp}).save();
  var evt = new eventClass({ _id: uuid.v4(), topic: '/topic1', value:'off', 'timestamp':timestamp }).save();
  var evt = new eventClass({ _id: uuid.v4(), topic: '/topic2', value:'on', 'timestamp':timestamp }).save();
  var evt = new eventClass({ _id: uuid.v4(), topic: '/topic2', value:'off', 'timestamp':timestamp }).save();
  var evt = new eventClass({ _id: uuid.v4(), topic: '/topic3', value:'on', 'timestamp':timestamp }).save();
  var evt = new eventClass({ _id: uuid.v4(), topic: '/topic3', value:'off', 'timestamp':timestamp }).save();
  var evt = new eventClass({ _id: uuid.v4(), topic: '/topicWithOutTS', value:'off'}).save();

  var act = new activityClass({_id: uuid.v4(), rule_id: 1, rule_name: "Rule 1", action_id: 1, action_name: "Action 1", is_activation: true, event_topic: "/topic1", event_value: "on", 'timestamp':timestamp }).save();
  var act = new activityClass({_id: uuid.v4(), rule_id: 2, rule_name: "Rule 2", action_id: 2, action_name: "Action 2", is_activation: false, event_topic: "/topic2", event_value: "off" , 'timestamp':timestamp}).save();
  var act = new activityClass({_id: uuid.v4(), rule_id: 3, rule_name: "Rule 3", action_id: 3, action_name: "Action 3", is_activation: false, event_topic: "/topic3", event_value: "off" , 'timestamp':timestamp}).save();
  var act = new activityClass({_id: uuid.v4(), rule_id: 3, rule_name: "Rule No TS", action_id: 3, action_name: "Action 3", is_activation: false, event_topic: "/topic3", event_value: "off"}).save();
}
