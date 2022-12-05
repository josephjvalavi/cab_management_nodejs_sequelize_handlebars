const Sequelize = require("sequelize");
const sequelize = new Sequelize("cabmanagement", "root", "Valavi@18", {
  host: "localhost",
  dialect: 'mysql',
});
module.exports.sequelize=sequelize;