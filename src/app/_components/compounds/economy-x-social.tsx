import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Label } from "../primitives/typography";

export type EconomyXSocialProps = ComponentProps<"div"> & {};

export const EconomyXSocial: FC<EconomyXSocialProps> = ({ className, ...restProps }) => {
  return (
    <div className={cn("text-center", className)} {...restProps}>
      <Label>Wirtschaftlich und Sozial denken.</Label>
    </div>
  );
};
