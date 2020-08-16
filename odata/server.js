var mongoose = require('mongoose');
var odata = require('node-odata');
 
var server = odata('mongodb://localhost/odata');
 
var eventModel = 
{
  _id : String,
  topic: String,
  value: String,
  timestamp: Date
}

var activityModel =
{
  _id : String,
  rule_id: Number,
  rule_name: String,
  action_id: Number,
  action_name: String,
  is_activation: Boolean,
  event_topic: String,
  event_value: String,
  timestamp: Date
}

server.resource('events', eventModel);
server.resource('activities', activityModel);

if ("prod" == process.env.NODE_ENV) {
  console.log("Running in prod environment"); 
} else {
  console.log("Running in test environment"); 

  mongoose.connect('mongodb://localhost/odata', {useNewUrlParser: true});

  const eventConf = {
    _id: false,	  
    versionKey: false,
    collection: "events"
  };

  const db = mongoose.connection;
  const fixture = require("./test/fixtures/initial.js");

  const eventSchema = new mongoose.Schema(eventModel,eventConf);
  const Event = mongoose.model('Event', eventSchema );
  Event.deleteMany({});

	
  const activityConf = {
    _id: false,	  
    versionKey: false,
    collection: "activities"
  };


  const activitySchema = new mongoose.Schema(activityModel,activityConf);
  const Activity = mongoose.model('Activity', activitySchema);
  Activity.deleteMany({});

  fixture.initial(Event, Activity);
}



server.listen(8083);
