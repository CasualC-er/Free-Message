import sqlite3 from "sqlite3";
const db = new sqlite3.Database("data/freemessages.sqlite3");
export default defineEventHandler(async (event) => {
  const body = readBody(event);
  console.log(body);
  return body;
});
