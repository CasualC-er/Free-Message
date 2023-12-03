import sqlite3 from "sqlite3";

const db = new sqlite3.Database("data/freemessages.sqlite3");
export default defineEventHandler(async (event) => {
  db.serialize();
  if (0) {
  }
});
