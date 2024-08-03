import { ComponentProps, FC, Fragment } from "react";
import { cn } from "~/app/_utils/cn";
import { Label } from "../primitives/typography";
import { CheckIcon } from "lucide-react";

export type RequirementListProps = ComponentProps<"div"> & {
  groups: string[][];
  seperatorLabel: string;
};

export const RequirementList: FC<RequirementListProps> = ({ className, groups, seperatorLabel, ...restProps }) => {
  return (
    <div className={cn("flex flex-col justify-center gap-8 sm:flex-row", className)} {...restProps}>
      {groups.map((group, index, array) => (
        <Fragment key={index}>
          <div className="flex max-w-[40rem] flex-col gap-2">
            {group.map((requirement, index) => (
              <div key={index} className="flex items-center gap-4 rounded-full bg-themed-primary p-2 pr-8">
                <div className="rounded-full bg-primary-900 p-2 text-neutral-100">
                  <CheckIcon />
                </div>
                <Label>{requirement}</Label>
              </div>
            ))}
          </div>
          {index < array.length - 1 && (
            <div className="flex items-center gap-4 sm:flex-col">
              <div className="h-px flex-1 bg-neutral-400 sm:w-px" />
              <Label>{seperatorLabel}</Label>
              <div className="h-px flex-1 bg-neutral-400 sm:w-px" />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};
