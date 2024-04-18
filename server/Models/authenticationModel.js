const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");
const sequelize = db;

const Auth = sequelize.define(
  "registrations",
  {
    userId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {}
);

Auth.sync({ alter: true });

module.exports = Auth;
