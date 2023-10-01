const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync();
const hash = bcrypt.hashSync("1234", salt);
console.log(salt, hash);
