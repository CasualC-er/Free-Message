import Database from "better-sqlite3";
const db = new Database("data/freemessages.sqlite3");
export default defineEventHandler(async (event) => {
  let request: any = await readBody(event);
  db.prepare(
    "INSERT INTO messages (user_id, username, body, timestamp) VALUES (?, ?, ?, ?)"
  ).run([request.user_id, request.username, request.body, request.timestamp]);
});
