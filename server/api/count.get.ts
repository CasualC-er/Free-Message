/* TESTING!!!*/
//TODO: remove this file
import Database from "better-sqlite3";

const db = new Database("data/freemessages.sqlite3");

export default defineEventHandler(async function (event) {
  const q = db.prepare("SELECT value FROM global_vars WHERE name = ?");
  let count_r: any = q.get("count");
  let count = count_r.value;
  console.log(count);
  return count;
});
