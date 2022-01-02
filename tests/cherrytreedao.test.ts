import { CtbCherryTreeDao } from "../src/cherrytree/CtbCherryTreeDao";
import fs from "fs";
import initSqlJs from "sql.js";

const filebuffer = fs.readFileSync("tests/data/os.sqlite");

test("db should exists", async () => {
  const SQL = await initSqlJs();

  const db = new SQL.Database(filebuffer);
  const stmt = db.prepare("select * from node;");
  while (stmt.step()) {
    const row = stmt.getAsObject();
    console.log(JSON.stringify(row));
  }
  console.log(db.run("select * from node;"));
  expect(db).not.toBeNull();
});
// test("xx", () => {
//   expect(1).toBe(1);
// });
