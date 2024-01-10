const users = require("../../routes/users");
const categories = require("../../routes/categories");
const express = require("express");

module.exports = (app) => {
  app.use(express.json());
  app.use("/api/categories", categories);
  app.use("/api/users", users);
};
