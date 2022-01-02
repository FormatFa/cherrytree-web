export default class CherryNode {
  private node_id: number;
  private father_id: number;

  private name: string;
  // private txt: string;
  private syntax: string;
  // private tags: string;
  // private is_ro: number;
  private is_richtxt: number;
  private has_codebox: number;
  private has_table: number;
  private has_image: number;
  private level: number;
  private ts_creation: number;
  private ts_lastsave: number;

  private children: Array<CherryNode> = [];
  public constructor(
    node_id: number,
    father_id: number,
    name: string,
    syntax: string,
    is_richtxt: number,
    has_codebox: number,
    has_table: number,
    has_image: number,
    level: number,
    ts_creation: number,
    ts_lastsave: number
  ) {
    this.node_id = node_id;
    this.father_id = father_id;
    this.name = name;
    this.syntax = syntax;
    this.is_richtxt = is_richtxt;
    this.has_codebox = has_codebox;
    this.has_table = has_table;
    this.has_image = has_image;
    this.level = level;
    this.ts_creation = ts_creation;
    this.ts_lastsave = ts_lastsave;
  }
  public getNodeId(): number {
    return this.node_id;
  }
  public getName(): string {
    return this.name;
  }
  public setChildren(children: Array<CherryNode>): void {
    this.children = children;
  }
  public getChildren(): Array<CherryNode> {
    return this.children;
  }
  public getFatherId(): number {
    return this.father_id;
  }
}
