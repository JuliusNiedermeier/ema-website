import { ComponentProps, FC } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionItemTriggerIndicator,
} from "../primitives/accordion";
import { Label, Paragraph } from "../primitives/typography";

export type BasicAccordionProps = ComponentProps<typeof Accordion> & {
  items: { title: string; content: string }[];
};

export const BasicAccordion: FC<BasicAccordionProps> = ({ items, ...restProps }) => {
  return (
    <Accordion {...restProps}>
      {items.map((item, index) => (
        <AccordionItem key={index} index={index}>
          <AccordionItemTrigger>
            <Label>{item.title}</Label>
            <AccordionItemTriggerIndicator />
          </AccordionItemTrigger>
          <AccordionItemContent>
            <Paragraph className="my-0">{item.content}</Paragraph>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
