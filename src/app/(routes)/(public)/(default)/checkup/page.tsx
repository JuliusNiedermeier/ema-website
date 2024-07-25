"use client";

import { ComponentProps, FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label } from "~/app/_components/primitives/typography";
import { Drawer } from "vaul";
import { Button } from "~/app/_components/primitives/button";
import { cn } from "~/app/_utils/cn";
import { CheckIcon } from "lucide-react";

const CheckupPage: FC = () => {
  return (
    <Drawer.Root>
      <div className="bg-neutral-200">
        <Container>
          <div className="flex min-h-[80vh] gap-12">
            <div className="hidden flex-1 overflow-x-hidden border-r border-neutral-400 pr-8 pt-12 lg:block">
              <Heading>Deine Voraussetzungen</Heading>
              <SidebarContent className="mt-12 w-full" />
            </div>
            <div className="flex-[2] pt-12">
              <Heading>Das passt zu dir</Heading>
            </div>
          </div>
          <Drawer.Trigger asChild className="sticky bottom-8 w-full justify-center lg:hidden">
            <Button>Open Drawer</Button>
          </Drawer.Trigger>
        </Container>
      </div>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-[black]/10" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 flex max-h-[80vh] flex-col rounded-t-3xl bg-neutral-100">
          <div className="border-b border-neutral-400">
            <Drawer.Handle className="mt-3 h-2 w-24 rounded-full bg-neutral-400" />
            <Container className="flex items-center gap-4 py-2">
              <Heading size="sm">Settings</Heading>
              <Label className="ml-auto">3 Ergebnisse</Label>
            </Container>
          </div>
          <div className="overflow-auto">
            <Container className="flex flex-col gap-12 py-12">
              <SidebarContent />
            </Container>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default CheckupPage;

type SidebarContentProps = Omit<ComponentProps<"div">, "children">;

const SidebarContent: FC<SidebarContentProps> = ({ className, ...restProps }) => {
  return (
    <div className={cn("flex flex-col gap-12", className)} {...restProps}>
      <div>
        <Heading size="sm">Für was interessiert du dich am meisten?</Heading>
        <div className="mt-4 flex flex-col gap-2">
          {["Wirtschaft", "Soziales", "Medizin"].map((label, index) => (
            <Selectable label={label} selected={index == 2} />
          ))}
        </div>
      </div>

      <div>
        <Heading size="sm">Wie alt bist du?</Heading>
        <div className="flex gap-2">
          {["Jünger als 23", "23 oder älter"].map((label, index) => (
            <Selectable label={label} selected={index === 1} className="flex-1" />
          ))}
        </div>
      </div>

      <div>
        <Heading size="sm">Welchen Schulabschluss hast du?</Heading>
        <div className="flex flex-col gap-2">
          {["Berufsbildunsreife", "Erweiterte Berufsbildunsreife", "Mittlerer Schulabschluss"].map((label, index) => (
            <Selectable label={label} selected={index === 1} className="flex-1" />
          ))}
        </div>
      </div>
    </div>
  );
};

export type SelectableProps = Omit<ComponentProps<"button">, "children"> & {
  selected?: boolean;
  label: string;
};

const Selectable: FC<SelectableProps> = ({ className, selected, label, ...restProps }) => {
  return (
    <button
      className={cn(
        "flex items-center justify-between gap-4 rounded-xl border-2 border-neutral-900 px-4 py-3",
        {
          "border-primary-900 bg-primary-900 text-primary-900-text": selected,
          "hover:bg-neutral-100": !selected,
        },
        className,
      )}
      {...restProps}
    >
      <Label>{label}</Label>
      <CheckIcon className={cn("invisible", { visible: selected })} />
    </button>
  );
};
