import Database from "better-sqlite3";
import bycrypt from "bcryptjs";
const db = new Database("data/freemessages.sqlite3");

export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  let user;
  // TODO: handle the sql errors
  try {
    let users: any = db.prepare("SELECT * FROM users WHERE username = ?;");
    user = users.get(body.username);
  } catch {}
  if (user) {
    return {
      status: 400,
      responseBody: "Failed to register user: Username taken.",
    };
  }
  let salt = bycrypt.genSaltSync(16);
  let hashed_password = bycrypt.hashSync(body.password, salt);
  try {
    const stmt = db.prepare(
      "INSERT INTO users (username, password, salt, email) VALUES (?, ?, ?, ?)"
    );
    stmt.run(body.username, hashed_password, salt, body.email);
  } catch {}
});
