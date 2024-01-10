const _ = require("lodash");
const check_auth_token = require("../middleware/auth_token");
const express = require("express");
const router = express.Router();
const { Category, validate } = require("../models/category");

// Index
router.get("/", check_auth_token, async (req, res) => {
  const categories = await Category.findAll();

  res.send(categories);
});

// Show
router.get("/:id", check_auth_token, async (req, res) => {
  const category = await Category.findByPk(req.params.id);

  res.send(category);
});

// Create
router.post("/", check_auth_token, async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.message);

  const category = await Category.create({
    name: req.body.name,
  });

  res.send(category);
});

// Update
router.put("/:id", check_auth_token, async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.message);

  let category = await Category.findByPk(req.params.id);

  if (!category) return res.status(401).send("Category does not exist.");

  category.set(_.pick(req.body, ["name"]));

  await category.save();

  res.send(category);
});

// Delete
router.delete("/:id", check_auth_token, async (req, res) => {
  const category = await Category.findByPk(req.params.id);

  if (!category) return res.status(401).send("Category does not exist.");

  await category.destroy();

  res.send(category);
});

module.exports = router;
