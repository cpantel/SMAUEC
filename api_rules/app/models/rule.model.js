module.exports = (sequelize, Sequelize) => {
  const Rule = sequelize.define("rules", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    topic: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    is_active: {
      type: Sequelize.BOOLEAN
    },
    duration: {
      type: Sequelize.INTEGER
    }
  });

  return Rule;
};
