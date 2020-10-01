class Action {
  constructor (name, topic, value, min_activation_time, activation_value, cancellation_value) {
    this.name = name;
    this.topic = topic;
    this.value = value
    this.min_activation_time = min_activation_time;
    this.activation_value = activation_value;
    this.cancellation_value = cancellation_value;
  }

};

module.exports = Action;
