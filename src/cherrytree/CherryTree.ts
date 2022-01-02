import CherryNode from "./CherryNode";
import CherryTreeDao from "./CherryTreeDao";

export default class CherryTree {
  private cherrytreeDao: CherryTreeDao | undefined;
  private nodeTree: Array<CherryNode> = [];

  public async init(cherrytreeDao: CherryTreeDao): Promise<void> {
    this.cherrytreeDao = cherrytreeDao;

    this.nodeTree = await this.cherrytreeDao.loadAllNodeTree();
  }
  public getNodeTxtById(node_id: number): string {
    if (this.cherrytreeDao == undefined) {
      throw Error("dao is null,please init first!");
    }
    return this.cherrytreeDao.getNodeTextById(node_id);
  }
  public getNodes(): Array<CherryNode> {
    return this.nodeTree;
  }
}
