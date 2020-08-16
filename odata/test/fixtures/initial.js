var uuid = require('uuid');

exports.initial = (eventClass, activityClass) => {
  var evt = new eventClass({ _id: uuid.v4(), topic: '/topic1', value:'on' }).save();
  var evt = new eventClass({ _id: uuid.v4(), topic: '/topic1', value:'off' }).save();
  var evt = new eventClass({ _id: uuid.v4(), topic: '/topic2', value:'on' }).save();
  var evt = new eventClass({ _id: uuid.v4(), topic: '/topic2', value:'off' }).save();
  var evt = new eventClass({ _id: uuid.v4(), topic: '/topic3', value:'on' }).save();
  var evt = new eventClass({ _id: uuid.v4(), topic: '/topic3', value:'off' }).save();

  var act = new activityClass({_id: uuid.v4(), rule_id: 1, rule_name: "Rule 1", action_id: 1, action_name: "Action 1", is_activation: true, event_topic: "/topic1", event_value: "on" }).save();
  var act = new activityClass({_id: uuid.v4(), rule_id: 2, rule_name: "Rule 2", action_id: 2, action_name: "Action 2", is_activation: false, event_topic: "/topic2", event_value: "off"  }).save();

}
