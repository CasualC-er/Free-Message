import Database from "better-sqlite3";
const db = new Database("data/freemessages.sqlite3");
export default defineEventHandler(async (event) => {
  const query = "SELECT * FROM messages";
  return db.prepare(query).all();
});
