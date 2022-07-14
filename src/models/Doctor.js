module.exports = (sequelize, Sequelize) => {
  return sequelize.define("Doctor", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    gender: {
      type: Sequelize.STRING,
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    attentionDays: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mondayStart: {
      type: Sequelize.STRING,
    },
    tuesdayStart: {
      type: Sequelize.STRING,
    },
    wednesdayStart: {
      type: Sequelize.STRING,
    },
    thursdayStart: {
      type: Sequelize.STRING,
    },
    fridayStart: {
      type: Sequelize.STRING,
    },
    saturdayStart: {
      type: Sequelize.STRING,
    },
    sundayStart: {
      type: Sequelize.STRING,
    },
    mondayEnd: {
      type: Sequelize.STRING,
    },
    tuesdayEnd: {
      type: Sequelize.STRING,
    },
    wednesdayEnd: {
      type: Sequelize.STRING,
    },
    thursdayEnd: {
      type: Sequelize.STRING,
    },
    fridayEnd: {
      type: Sequelize.STRING,
    },
    saturdayEnd: {
      type: Sequelize.STRING,
    },
    sundayEnd: {
      type: Sequelize.STRING,
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
