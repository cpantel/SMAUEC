const config = require("../config/db.config." + process.env.NODE_ENV + ".js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.action = require("../models/action.model.js")(sequelize, Sequelize);
db.rule = require("../models/rule.model.js")(sequelize, Sequelize);
db.activity = require("../models/activity.model.js")(sequelize, Sequelize);

db.action.hasMany(db.rule);
db.rule.belongsTo(db.action);

db.activity.belongsTo(db.action);
db.activity.belongsTo(db.rule);




module.exports = db;

