const { Sequelize } = require("sequelize");

const pool = new Sequelize("myblog", "postgres", "kehinde15", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = pool;
