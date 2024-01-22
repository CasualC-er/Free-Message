import Database from "better-sqlite3";
const db = new Database("data/freemessages.sqlite3");
export default defineEventHandler(async (event) => {
  const body: any = await readBody(event);
  console.log(body);

  const message_id = body.message_id;
  console.log(message_id);

  const stmt = db.prepare(`UPDATE messages SET body = ? WHERE id = ?`);
  stmt.run(body.edit, message_id);
});
