exports.allAccess = (req, res) => {
  console.log("user controller all access");
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  console.log("user controller user access");
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  console.log("user controller admin access");
  res.status(200).send("Admin Content.");
};
