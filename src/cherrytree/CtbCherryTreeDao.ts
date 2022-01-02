import SQLTool from "../sql/SQLTool";
import { Database } from "sql.js";
import CherryNode from "./CherryNode";
import CherryTreeDao from "./CherryTreeDao";
import { CodeBox } from "./CherryDef";

export class CtbCherryTreeDao implements CherryTreeDao {
  private db: Database;
  public constructor(data: Uint8Array) {
    this.db = new (SQLTool.getSQL().Database)(data);
  }
  getCodeBoxListById(nodeId: number): CodeBox[] {
    throw new Error("Method not implemented.");
  }
  getNodeTextById(nodeId: number): string {
    const stmt = this.db.prepare("select txt from node where node_id=:node_id");
    const result = stmt.getAsObject({ ":node_id": nodeId });
    stmt.free();
    return <string>result["txt"];
  }
  // public constructor(sqlStatic: SqlJsStatic, data: Uint8Array) {
  //   this.db = new sqlStatic.Database(data);
  // }

  async loadAllNodeTree(): Promise<CherryNode[]> {
    const result: CherryNode[] = [];
    const querySql = this.db.prepare(
      "select c.node_id,c.father_id,c.sequence,n.name,n.syntax,n.is_richtxt,n.has_codebox,n.has_table,n.has_image,n.level,n.ts_creation,n.ts_lastsave from children c left join node n on c.node_id=n.node_id;"
    );
    const fatherMap = new Map<number, CherryNode>();
    while (querySql.step()) {
      const row = querySql.getAsObject();
      const father_id: number = <number>row["father_id"];
      const node_id: number = <number>row["node_id"];
      const node = new CherryNode(
        node_id,
        father_id,
        <string>row["name"],
        <string>row["syntax"],
        <number>row["is_richtxt"],
        <number>row["has_codebox"],
        <number>row["has_table"],
        <number>row["has_image"],
        <number>row["level"],
        <number>row["ts_creation"],
        <number>row["ts_lastsave"]
      );
      fatherMap.set(node_id, node);
      if (node.getFatherId() == 0) {
        result.push(node);
      }
    }
    querySql.free();
    fatherMap.forEach((node, node_id, map) => {
      const parent_node = map.get(node.getFatherId());
      if (parent_node) {
        let children = parent_node.getChildren();
        if (children == null) {
          children = [];
          parent_node.setChildren(children);
        }
        children.push(node);
      }
    });

    return result;
  }
}
