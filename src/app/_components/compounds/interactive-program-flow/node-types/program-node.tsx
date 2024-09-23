import { Handle, NodeProps, Node, Position } from "@xyflow/react";
import { FC } from "react";
import { Card } from "~/app/_components/primitives/card";
import { Label } from "~/app/_components/primitives/typography";
import { createColorThemeStyles, HSLValue } from "~/app/_utils/color-swatch";

export type ProgramNode = Node<{ name: string; color: HSLValue }, "program">;

export const ProgramNode: FC<NodeProps<ProgramNode>> = ({ data }) => {
  return (
    <>
      <Handle type="source" position={Position.Top} isConnectable={false} className="invisible" />
      <Card style={createColorThemeStyles(data.color)} className="bg-themed-primary p-4">
        <Label>{data.name}</Label>
      </Card>
      <Handle type="target" position={Position.Bottom} isConnectable={false} className="invisible" />
    </>
  );
};
