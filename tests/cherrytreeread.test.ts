import { CtbCherryTreeDao } from "../src/cherrytree/CtbCherryTreeDao";
import fs from "fs";
import initSqlJs from "sql.js";
import CherryNode from "@/cherrytree/CherryNode";
import SQLTool from "../src/sql/SQLTool";

const filebuffer = fs.readFileSync("tests/data/os.sqlite");

test("read11", async () => {
  await SQLTool.initSql2();
  const dao = new CtbCherryTreeDao(filebuffer);
  const nodes: CherryNode[] = await dao.loadAllNodeTree();
  console.log(JSON.stringify(nodes));
  console.log("length:" + nodes.length);
  expect(nodes.length).toEqual(14);
  const txt = dao.getNodeTextById(1);
  console.log(txt);
  expect(txt).not.toBeNull();
});
