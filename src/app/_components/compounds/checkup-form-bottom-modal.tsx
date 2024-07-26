"use client";

import { ComponentProps, FC } from "react";
import { Drawer } from "vaul";
import { Container } from "../primitives/container";
import { Heading, Label } from "../primitives/typography";
import { CheckupForm } from "./checkup-form";

export type CheckupFormBottomModalProps = ComponentProps<typeof Drawer.Portal> & {};

export const CheckupFormBottomModal: FC<CheckupFormBottomModalProps> = ({ ...restProps }) => {
  return (
    <Drawer.Portal {...restProps}>
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
            <CheckupForm />
          </Container>
        </div>
      </Drawer.Content>
    </Drawer.Portal>
  );
};

export const CheckupFormBottomModalRoot = Drawer.Root;
export const CheckupFormBottomModalTrigger = Drawer.Trigger;
