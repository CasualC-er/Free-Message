/* TESTING!!!*/
//TODO: remove this file
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("data/freemessages.sqlite3");

export default defineEventHandler(async function (event) {
  let count = db.get("SELECT value FROM global_vars WHERE name=$name;", {
    $name: "request_count",
  });
  console.log(count);
  if (count === null) {
    throw Error;
  }
  db.run("UPDATE global_vars SET value=$value WHERE name=$name;", {
    $value: count + 1,
    $name: "request_count",
  });
  return count;
});
