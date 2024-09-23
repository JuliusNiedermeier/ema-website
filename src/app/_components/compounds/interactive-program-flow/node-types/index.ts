import { Node, NodeTypes } from "@xyflow/react";
import { ProgramNode } from "./program-node";
import { TextNode } from "./text-node";
import { ComponentProps } from "react";

export type CustomNodeTypeMap = typeof nodeTypes;

export type CustomNodeMap = {
  [NodeType in keyof CustomNodeTypeMap]: Node<ComponentProps<CustomNodeTypeMap[NodeType]>["data"], NodeType>;
};

export type CustomNode = CustomNodeMap[keyof CustomNodeMap];

export const nodeTypes = { program: ProgramNode, text: TextNode } satisfies NodeTypes;
