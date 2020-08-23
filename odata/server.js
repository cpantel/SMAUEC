const delay = require('delay');
var mongoose = require('mongoose');
var odata = require('node-odata');

(async () => {
  await delay(10000);

  var server = odata('mongodb://repo_mongo_1/odata');


  // unhardcode url
 
  var eventModel = {
    _id : String,
    topic: String,
    value: String,
    timestamp: Date
  }

  var activityModel = {
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

    mongoose.connect('mongodb://repo_mongo_1/odata', {useNewUrlParser: true});

    const eventConf = {
      _id: false,	  
      versionKey: false,
      collection: "events"
    };

    const db = mongoose.connection;
    const fixture = require("./test/fixtures/initial.js");

    const eventSchema = new mongoose.Schema(eventModel,eventConf);
    const Event = mongoose.model('Event', eventSchema );
    Event.deleteMany({},function(err) {
      console.log(" Event.deleteMany");
      console.log(err);
    }
    );

	
    const activityConf = {
      _id: false,	  
      versionKey: false,
      collection: "activities"
    };

    const activitySchema = new mongoose.Schema(activityModel,activityConf);
    const Activity = mongoose.model('Activity', activitySchema);
    Activity.deleteMany({},function(err) {
      console.log(" Activity.deleteMany");
      console.log(err);
    });
    fixture.initial(Event, Activity);
  }

  const PORT = process.env.PORT || 8084;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });

})();
