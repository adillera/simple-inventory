const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.message);

  const [user] = await User.findOrCreate({
    where: { email: req.body.email },
    defaults: _.pick(req.body, ["name", "email", "password"]),
  });

  const token = user.generateAuthToken();
  const userDetails = _.pick(user, ["id", "name", "email"]);

  res.header("x-auth-token", token).send(userDetails);
});

module.exports = router;
