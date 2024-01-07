const winston = require("winston");
require("express-async-errors");

const logger = (app) => {
  const logfile = `./log/${app.get("env")}_log.log`;

  process.on("unhandledRejection", (error) => {
    throw error;
  });

  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: logfile })
  );

  winston.add(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: logfile })
  );
};

module.exports = logger;
