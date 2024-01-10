const Joi = require("joi");
const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/initializers/database")();

class Category extends Model {}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "category",
  }
);

const validate = (obj) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(obj);
};

exports.Category = Category;
exports.validate = validate;
