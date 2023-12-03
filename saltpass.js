import bcrypt from "bcryptjs";
var salt = bcrypt.genSaltSync(16);
var hash = bcrypt.hashSync("admin", salt);
console.log(`password: ${hash}\nsalt: ${salt}`);
