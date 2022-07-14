module.exports = (sequelize, Sequelize) => {
  return sequelize.define("Date", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    startDate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    endDate: {
      type: Sequelize.STRING,
    },
    diagnostic: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
};
