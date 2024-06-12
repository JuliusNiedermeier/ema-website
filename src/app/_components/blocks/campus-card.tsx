import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Label } from "../primitives/typography";

export type CampusCardProps = ComponentProps<"div"> & {};

export const CampusCard: FC<CampusCardProps> = ({ className, ...restProps }) => {
  return (
    <div className={cn("text-center", className)} {...restProps}>
      <Label>Campus</Label>
    </div>
  );
};
