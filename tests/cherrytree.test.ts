import CherryNode from "../src/cherrytree/CherryNode";
type TreeNode = {
  id: number;
  name: string;
  children: TreeNode[];
};
function toTreeData(cherryNode: CherryNode): TreeNode {
  const result: TreeNode = {
    id: cherryNode.getNodeId(),
    name: cherryNode.getName(),
    children: [],
  };
  // console.log(cherryNode);
  console.log("result", result);
  const children = [];
  console.log(cherryNode.getChildren().length);
  for (const cherryItem of cherryNode.getChildren()) {
    console.log("item", cherryItem);
    const temp = toTreeData(cherryItem);
    children.push(temp);
  }
  console.log("child", children);
  result.children = children;

  return result;
}
test("children length should be 0", () => {
  // const children: CherryNode[] = [];
  // const cherryNode: CherryNode = new CherryNode(1, 0, "root");
  // const child1 = new CherryNode(2, 1, "cild1");
  // const child2 = new CherryNode(2, 1, "cild1");
  // const child3 = new CherryNode(2, 1, "cild1");
  // cherryNode.setChildren([child1, child2, child3]);
  // expect(3).toEqual(cherryNode.getChildren().length);
  // const treeNode = toTreeData(cherryNode);
  // console.log(JSON.stringify(treeNode));
});
