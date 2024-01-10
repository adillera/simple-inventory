const { Category } = require("./models/category");
const { User } = require("./models/user");

(async () => {
  await Category.sync();
  await User.sync();
})();
