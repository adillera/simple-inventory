const { Sequelize } = require("sequelize");

const sequelize = () => {
  return new Sequelize({
    host: "localhost",
    dialect: "postgres",
    username: "ajdillera",
    password: "1234qwer",
    database: "simple_inventory",
  });
};

module.exports = sequelize;
