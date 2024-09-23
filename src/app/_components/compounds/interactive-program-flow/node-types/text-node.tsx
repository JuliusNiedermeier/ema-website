import { Handle, NodeProps, Node, Position } from "@xyflow/react";
import { FC } from "react";
import { Card } from "~/app/_components/primitives/card";
import { Label } from "~/app/_components/primitives/typography";

export type TextNode = Node<{ label: string }, "text">;

export const TextNode: FC<NodeProps<TextNode>> = ({ data }) => {
  return (
    <>
      <Card className="neutral-100/10 rounded-full p-4 text-neutral-900-text">
        <Label>{data.label}</Label>
      </Card>
      <Handle type="target" position={Position.Bottom} />
    </>
  );
};
