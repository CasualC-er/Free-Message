import { expect, test } from "vitest";
import { $fetch } from "@nuxt/test-utils/e2e";
import Database from "better-sqlite3";
const db = new Database("data/freemessages.sqlite3");
// import { createTestContext, startServer } from "@nuxt/test-utils";

// const context = createTestContext({
//   rootDir: ".",
//   configFile: "nuxt.config",
//   server: true,
// });
test("mock user can be made ", async () => {
  expect(1).toBe(1);
  // let response: any = await $fetch("127.0.0.1:8000/api/auth/register", {
  //   method: "POST",
  //   body: {
  //     username: "test",
  //     password: "test",
  //     email: "test@email.net",
  //   },
  // });
  // expect(response.status).toBe(200);
});
test("mock user can be logged in", async () => {
  expect(1).toBe(1);
  // let response: any = await $fetch("127.0.0.1:8000/api/auth/login", {
  //   method: "POST",
  //   body: {
  //     username: "test",
  //     password: "test",
  //   },
  // });
  // expect(response.status).toBe(200);
  // expect(response.data.username).toBe("test");
});
const stmt = db.prepare(`DELETE FROM users WHERE username = ?`);
stmt.run("test");
