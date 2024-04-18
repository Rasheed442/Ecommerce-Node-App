const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");
const sequelize = db;

const Product = sequelize.define(
  "products",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
    },
    profile_url: {
      type: DataTypes.STRING,
    },
    userId: {
      type: Sequelize.UUID,
    },
  },
  {}
);

Product.sync({ alter: true });

module.exports = Product;
