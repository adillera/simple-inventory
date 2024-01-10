const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/initializers/database")();

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

User.prototype.generateAuthToken = function () {
  const token = jwt.sign(
    {
      id: this.id,
      name: this.name,
      email: this.email,
    },
    config.get("jwtPrivateKey")
  );

  return token;
};

const validate = (obj) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(obj);
};

exports.User = User;
exports.validate = validate;
