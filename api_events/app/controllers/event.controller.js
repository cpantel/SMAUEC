const axios = require('axios');
const querystring = require('querystring');

exports.findOne = (req, res) => {
  return findTheOne(req.params.actionId, res, 200);
};

exports.findAll = (req, res) => {
  var params = "?" + querystring.stringify(req.query);
  axios.get("http://repo_odata_1:8084/events" + params)
    .then(function(response) {
      console.log(response.config.url);

      if ( ! params.match(/select/ ) ) {
        response.data.value = response.data.value.map( elem => {
          if (undefined == elem.timestamp) elem.timestamp = null;
          return elem;
        });	    
      }
      res.status(200).send(
        {
          status:200,
          message: "Event list",
          result: response.data.value
        }
      );
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
  var event = req.body;
  event.timestamp = Date.now();
  axios.post("http://repo_odata_1:8084/events",
    event 
    )
    .then(function(response) {
    console.log(response.config.url);
      res.status(201).send(
        {
          status:201,
          message: "Event created",
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
