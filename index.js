const winston = require("winston");
const Joi = require("joi");
const express = require("express");
const app = express();

require("./config/initializers/logging")(app);

const port = process.env.PORT || 3000;

app.listen(port, () => winston.info(`Listening on port ${port}...`));
