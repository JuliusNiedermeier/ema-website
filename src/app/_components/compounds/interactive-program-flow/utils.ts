import { graphlib, layout } from "@dagrejs/dagre";
import { Node, Edge } from "@xyflow/react";

export const checkNodeRectsEquality = (a: Node, b: Node) => {
  return (
    a.position.x === b.position.x &&
    a.position.y === b.position.y &&
    a.measured?.height === b.measured?.height &&
    a.measured?.width === b.measured?.width
  );
};

export const getLayoutedNodes = (nodes: Node[], edges: Edge[]) => {
  // Must use setGraph({}) to avoid type error
  const graph = new graphlib.Graph<{ color: string }>().setGraph({ rankdir: "BT" });
  graph.setDefaultEdgeLabel(() => ({}));

  nodes.forEach((node) =>
    graph.setNode(node.id, { height: node.measured?.height || 0, width: node.measured?.width || 0 }),
  );

  edges.forEach((edge) => graph.setEdge(edge.source, edge.target));

  layout(graph);

  return nodes.map<Node>((node) => {
    const { x, y, height, width } = graph.node(node.id);
    return { ...node, position: { x: x - width / 2, y: y - height / 2 } };
  });
};
