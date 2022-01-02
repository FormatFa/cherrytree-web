import { CodeBox } from "./CherryDef";
import CherryNode from "./CherryNode";

export default interface CherryTreeDao {
  loadAllNodeTree(): Promise<Array<CherryNode>>;
  getNodeTextById(nodeId: number): string;
  getCodeBoxListById(nodeId: number): CodeBox[];
}
