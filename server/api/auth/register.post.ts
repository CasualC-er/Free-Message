import Database from "better-sqlite3";
import { sha256, sha224 } from "js-sha256";
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
  let salt = sha256(body.username);
  let hashed_password = sha256(`${body.password}${salt}`);
  try {
    const stmt = db.prepare(
      "INSERT INTO users (username, password, salt, email) VALUES (?, ?, ?, ?)"
    );
    stmt.run(body.username, hashed_password, salt, body.email);
  } catch {
    return {
      status: 500,
      responseBody:
        "Some error occured. I couldn't be bothered to check it at time of coding.",
    };
  }
  return { status: 200 };
});
