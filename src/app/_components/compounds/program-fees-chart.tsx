"use client";

import { ComponentProps, FC, useMemo } from "react";
import { transform } from "framer-motion";
import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronsUpDownIcon, ChevronUpIcon } from "lucide-react";
import { createColorThemeStyles, HSLValue } from "~/app/_utils/color-swatch";
import { cn } from "~/app/_utils/cn";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { groupBy } from "~/app/_utils/group-by";
import { Chip } from "../primitives/chip";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProgramFeesChartState = {
  selectedProgramID: string | null;
  setSelectedProgramID: (ID: string) => void;
};

const useProgramFeesChartStore = create(
  persist<ProgramFeesChartState>(
    (set) => ({
      selectedProgramID: null,
      setSelectedProgramID: (ID) => set((state) => ({ ...state, selectedProgramID: ID })),
    }),
    {
      name: "program-fees",
    },
  ),
);

export type ProgramFeesChartProps = ComponentProps<"div"> & {
  programSelectLabel: string;
  programSelectPlaceholder: string;
  incomeLabel: string;
  feeLabel: string;
  defaultProgramID: string | null;
  programFees: {
    program: { ID: string; title: string; type: { ID: string; title: string }; color: HSLValue };
    feeGroups: {
      title: string;
      description?: string;
      highlight?: boolean;
      fees: { incomeRangeLabel: string; fee: number; isCoverageRate: boolean }[];
    }[];
  }[];
};

export const ProgramFeesChart: FC<ProgramFeesChartProps> = ({
  className,
  programSelectLabel,
  programSelectPlaceholder,
  incomeLabel,
  feeLabel,
  defaultProgramID,
  programFees,
  ...restProps
}) => {
  const { selectedProgramID, setSelectedProgramID } = useProgramFeesChartStore();

  const selectedProgram = useMemo(() => {
    const program = programFees.find(({ program }) => program.ID === (selectedProgramID || defaultProgramID));
    if (!program) return null;

    const feeValues = program.feeGroups.map((group) => group.fees.map((fee) => fee.fee)).flat();
    const minFee = Math.min(...feeValues);
    const maxFee = Math.max(...feeValues);

    return {
      ...program,
      feeGroups: program.feeGroups.map((group) => ({
        ...group,
        fees: group.fees.map((fee) => ({ ...fee, feePercentage: transform(fee.fee, [minFee, maxFee], [75, 100]) })),
      })),
    };
  }, [programFees, selectedProgramID, defaultProgramID]);

  const groupedPrograms = groupBy(programFees, (program) => program.program.type.ID);

  return (
    <div className={cn("", className)} {...restProps}>
      <Chip className="border border-neutral-400 bg-neutral-200">
        <Label>{programSelectLabel}</Label>
      </Chip>
      <Select.Root value={selectedProgramID || defaultProgramID || ""} onValueChange={setSelectedProgramID}>
        <Select.Trigger className="relative mt-2 w-full rounded-2xl">
          <Select.Value
            placeholder={<Label className="block w-full p-4 text-left">{programSelectPlaceholder}</Label>}
            className="text-left"
          />
          <Select.Icon className="absolute bottom-0 right-0 top-0 grid w-12 place-items-center">
            <ChevronsUpDownIcon size={18} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="z-50 overflow-hidden rounded-3xl border border-neutral-400 bg-neutral-100 shadow">
            <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-neutral-100">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className="grid gap-2 p-2">
              {Object.keys(groupedPrograms).map((programID) => {
                const currentGroupPrograms = groupedPrograms[programID] || [];
                if (!currentGroupPrograms.length) return null;
                const colorThemeStyles = createColorThemeStyles(currentGroupPrograms[0].program.color);
                return (
                  <Select.Group key={programID} className="rounded-2xl bg-themed-primary p-1" style={colorThemeStyles}>
                    {currentGroupPrograms.map(({ program }) => (
                      <Select.Item
                        key={program.ID}
                        value={program.ID}
                        className="relative data-[highlighted]:outline-none [&[data-highlighted]_[data-program-item]]:bg-themed-secondary"
                      >
                        <Select.ItemText>
                          <div
                            data-program-item
                            className="rounded-xl bg-themed-primary p-3 pr-14 text-left leading-none"
                            style={colorThemeStyles}
                          >
                            <Label className="text-neutral-100-text-muted">{program.type.title}</Label>
                            <Label className="mt-1 block">{program.title}</Label>
                          </div>
                        </Select.ItemText>
                        <Select.ItemIndicator className="absolute bottom-0 right-0 top-0 grid w-12 place-items-center">
                          <CheckIcon size={18} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Group>
                );
              })}
            </Select.Viewport>
            <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-neutral-100">
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <div className="mt-8 flex items-center justify-between rounded-3xl border border-neutral-400 bg-neutral-200 p-2">
        <Chip className="rounded-2xl border border-neutral-400 bg-neutral-300">
          <Label>{incomeLabel}</Label>
        </Chip>
        <Label className="mr-4 block">{feeLabel}</Label>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {(selectedProgram?.feeGroups || []).map((group, groupIndex) => (
          <div
            key={groupIndex}
            className={cn(
              "flex flex-col justify-between gap-2 rounded-3xl border border-neutral-400 bg-neutral-200 p-2 md:flex-row-reverse md:gap-[10vw]",
              {
                "bg-primary-100/100": group.highlight,
              },
            )}
          >
            <div className="min-w-60 flex-1 px-2 md:px-0">
              <Heading size="sm" className="mb-0">
                {group.title}
              </Heading>
              <Paragraph className="mt-1">{group.description}</Paragraph>
            </div>
            <div className="flex flex-[2] flex-col gap-2">
              {group.fees.map((fee, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl bg-primary-900 p-2 hover:bg-primary-900/90"
                  style={{ width: `${fee.feePercentage}%` }}
                >
                  <Chip className="rounded-xl">
                    <Label>{fee.incomeRangeLabel}</Label>
                  </Chip>
                  <Label className="mr-4 text-neutral-900-text">{fee.fee} €</Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
