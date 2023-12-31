import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
const db = new Database("data/freemessages.sqlite3");
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let user;
  // TODO: handle the sql errors
  try {
    let users: any = db.prepare("SELECT * FROM users WHERE username = ?;");
    user = users.get(body.username);
  } catch {}

  if (!user) {
    return { status: 404, responseBody: "Could not find user" };
  }

  let salt = user.salt;
  let hashed_password = bcrypt.hashSync(body.password, salt);

  if (user.password !== hashed_password) {
    return { status: 400, responseBody: "Passwords do not match" };
  }
  event.context.session = { username: user.username, verified: true };
  return { status: 200, responseBody: "" };
});
