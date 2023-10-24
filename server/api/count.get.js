/* TESTING!!!*/
//TODO: remove this file
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("mydatabase.db");

export default defineEventHandler(async function (event) {
  let f = await useStorage("dev").getItem("count");
  if (f === null) {
    useStorage("dev").setItem("count", "0");
  }
  console.log(f);
  return 3;
});
