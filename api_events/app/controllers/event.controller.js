exports.findOne = (req, res) => {
  return findTheOne(req.params.actionId, res, 200);
};

exports.findAll = (req, res) => {
  if (req.query) {
    res.status(200).send( {
      status:200,
      message: "Event list",
      result: { "query": JSON.stringify(req.query)
      }
   }) 
  } else {	  
  res.status(200).send(
    {
      status:200,
      message: "Event list",
      result: [
        {
          "topic": "/topic1",
          "value": "on",
          "id": "xxxx xxxx xxxx"
        },
        {
          "topic": "/topic2",
          "value": "off",
          "id": "yyyy yyyy yyyy"
        }
      ]
    }
  );
  }  
  /*	
  Action.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']}
  }

  ).then(actions => {
    res.status(200).send({
        status:200,
        message: "Action list",
        result: actions
      });
  })
  */
}

exports.delete = (req, res) => {
  Action.destroy(
    {where: {id: req.params.actionId}}
  ).then( num=> {
     if (1 == num) {
        res.status(201).send({
        status:201,
        message: "Action deleted",
        result: {}
      })
     } else { 
      res.status(401).send({
        status:401,
        message: "Action not found",
        result: {}
      })
     }}
  );
}

exports.create = (req, res) => {
  Action.create(req.body)
    .then(action => {
      return findTheOne(action.id,res,201);
    })
    .catch(err => {
      res.status(500).send({
        status:500,
        message: err.message,
        result: {}
      });
    });
};

exports.update = (req, res) => {
  Action.update(
   req.body, 
   { where: { id: req.body.id } }
  ).then(action => {
    if (null == action) {
      res.status(403).send({
        status:403,
        message: "Action not found",
        result: {}
      }); 
    } else {
      return findTheOne(req.body.id,res,201);
    }
  }).catch(err => {
    return res.status(500).send({
        status:500,
        message: "Server error",
        result: {}
      });
  })
};

