"use client";

import {
  Background,
  Edge,
  Node,
  ReactFlow,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ComponentProps, FC, useCallback, useEffect, useRef, useState } from "react";
import { nodeTypes, CustomNodeTypeMap, CustomNode, CustomNodeMap } from "./node-types";
import { checkNodeRectsEquality, getLayoutedNodes } from "./utils";

type ProgramFlowItemMap = {
  [NodeType in keyof CustomNodeMap]: {
    id: string;
    type: NodeType;
    data: ComponentProps<CustomNodeTypeMap[NodeType]>["data"];
    nextItemIDs: string[];
  };
};

type ProgramFlowItem = ProgramFlowItemMap[keyof ProgramFlowItemMap];

type ProgramFlowProps = Omit<ComponentProps<typeof ReactFlow>, "children"> & { items: ProgramFlowItem[] };

const Flow: FC<ProgramFlowProps> = ({ items, ...restProps }) => {
  const initialNodes = items.map<CustomNode>(({ nextItemIDs, ...item }) => ({
    ...item,
    position: { x: 0, y: 0 },
  }));

  const initialEdges = items
    .map<Edge[]>((item) =>
      item.nextItemIDs.map<Edge>((targetNodeID) => ({
        id: `${item.id}:${targetNodeID}`,
        source: item.id,
        target: targetNodeID,
        className: "[&_*]:!stroke-primary-100",
      })),
    )
    .flat();

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const lastLayoutedNodesLookup = useRef(new Map<string, Node>());

  const { fitView } = useReactFlow();

  const onNodesChange = useCallback<OnNodesChange<Node>>(
    (changes) => setNodes((nodes) => applyNodeChanges(changes, nodes)),
    [],
  );

  const onEdgesChange = useCallback<OnEdgesChange>(
    (changes) => setEdges((edges) => applyEdgeChanges(changes, edges)),
    [],
  );

  useEffect(() => {
    const someNodeRectsChanged = nodes.some((node) => {
      const previouslyLayoutedNode = lastLayoutedNodesLookup.current.get(node.id);
      return !previouslyLayoutedNode || !checkNodeRectsEquality(node, previouslyLayoutedNode);
    });

    if (!someNodeRectsChanged) return;

    const layoutedNodes = getLayoutedNodes(nodes, edges);
    lastLayoutedNodesLookup.current = new Map(layoutedNodes.map((node) => [node.id, node]));
    setNodes(layoutedNodes);
    window.requestAnimationFrame(() => fitView({ duration: 250 }));
  }, [nodes, edges, fitView]);

  return (
    <ReactFlow
      panOnDrag={false}
      zoomOnScroll={false}
      zoomOnPinch={false}
      zoomOnDoubleClick={false}
      preventScrolling={false}
      nodesDraggable={false}
      edgesReconnectable={false}
      edgesFocusable={false}
      minZoom={0}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      {...restProps}
    >
      <Background style={{ backgroundColor: "hsl(var(--primary-900))" }} />
    </ReactFlow>
  );
};

export const InteractiveProgramFlow: FC<ComponentProps<typeof Flow>> = (props) => {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  );
};
