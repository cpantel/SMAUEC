const axios = require('axios');
const querystring = require('querystring');

exports.findOne = (req, res) => {
  return findTheOne(req.params.actionId, res, 200);
};

exports.findAll = (req, res) => {
  var params = "?" + querystring.stringify(req.query);
  axios.get("http://repo_odata_1:8084/activities" + params)
    .then(function(response) {
      if ( ! params.match(/select/ ) ) {
        response.data.value = response.data.value.map( elem => {
          if (undefined == elem.timestamp) elem.timestamp = null;
          return elem;
        });
      }

      res.status(200).send(
        {
          status:200,
          message: "Activity list",
          result: response.data.value
	});	
    })
    .catch(function(error) {
      res.status(500).send(
        {
          status:500,
          message: "Error",
          result: error
	});	
    })
    .finally(function() {
      
    });
};

exports.create = (req, res) => {
  var activity = req.body;
  activity.timestamp = Date.now();
  axios.post("http://repo_odata_1:8084/activities",
    activity
    )
    .then(function(response) {
    console.log(response.config.url);
      res.status(201).send(
        {
          status:201,
          message: "Activity created",
          result: response.data
	});	
    })
    .catch(function(error) {
      res.status(500).send(
        {
          status:500,
          message: "Error",
          result: error
	});	
    })
    .finally(function() {
      
    });
};
