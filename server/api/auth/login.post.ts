import Database from "better-sqlite3";
import { sha256 } from "js-sha256";

const db = new Database("data/freemessages.sqlite3");
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let user;
  try {
    let users: any = db.prepare("SELECT * FROM users WHERE username = ?;");
    user = users.get(body.username);
  } catch (err) {
    console.error("ERR: ", err);
  }

  if (!user) {
    return { status: 404, responseBody: "Could not find user" };
  }

  let salt = user.salt;
  let hashed_password = sha256(`${body.password}${salt}`);

  if (user.password !== hashed_password) {
    return { status: 400, responseBody: "Passwords do not match" };
  }
  return { status: 200, responseBody: "", user: user };
});
