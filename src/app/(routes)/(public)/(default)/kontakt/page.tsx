import { VariantProps, cva } from "class-variance-authority";
import {
  AtSignIcon,
  CalendarCheckIcon,
  ExternalLinkIcon,
  InfoIcon,
  LucideIcon,
  MapPinIcon,
  PhoneCallIcon,
  UsersIcon,
  VideoIcon,
} from "lucide-react";
import Image from "next/image";
import { ComponentProps, FC } from "react";
import { Button, ButtonInteractionBubble } from "~/app/_components/primitives/button";
import { Card } from "~/app/_components/primitives/card";
import { Container } from "~/app/_components/primitives/container";
import { Tab, TabList } from "~/app/_components/primitives/tabs";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { cn } from "~/app/_utils/cn";

type SectionLink = {
  ID: string;
  icon: LucideIcon;
  name: string;
};

const sectionLinks: SectionLink[] = [
  { ID: "infoabend", icon: UsersIcon, name: "Infoabend" },
  { ID: "beratung", icon: InfoIcon, name: "Offene Beratung" },
  { ID: "gespräch", icon: CalendarCheckIcon, name: "Persönliches Gespräch" },
  { ID: "telefon", icon: AtSignIcon, name: "Per Mail oder Telefon" },
];

const infoEveningDates = [Date.now(), Date.now() + 1000 * 60 * 60 * 24 * 7, Date.now() + 1000 * 60 * 60 * 24 * 14];

const ContactPage: FC = () => {
  return (
    <div>
      <div className="bg-neutral-200 pt-16">
        <Container className="flex flex-col gap-16 sm:flex-row sm:items-center">
          <div className="flex-1">
            <Heading>Viele Wege führen zu uns.</Heading>
            <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-4">
              {sectionLinks.map((sectionLink) => (
                <Card key={sectionLink.ID} className="flex items-center gap-4 bg-primary-100 p-4">
                  <div className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full bg-primary-900 text-primary-100">
                    <sectionLink.icon size="18" />
                  </div>
                  <Label>{sectionLink.name}</Label>
                </Card>
              ))}
            </div>
          </div>
          <div className="relative aspect-square flex-1 overflow-hidden rounded-2xl rounded-b-none border border-b-0">
            <Image
              src="/map.png"
              height="1000"
              width="1000"
              alt="Map"
              className="h-full w-full object-cover saturate-50"
            />
            <Button className="absolute bottom-4 right-4 gap-2">
              <Label>In Maps öffnen</Label>
              <ExternalLinkIcon size="18" />
            </Button>
          </div>
        </Container>
      </div>

      <Container className="flex flex-col gap-16 py-32 sm:flex-row">
        <div className="flex-1">
          <SectionIndicator name="Infoabend" icon={UsersIcon} />
          <Heading className="mt-8">Lerne uns bei unserem Infoabend am 24. Juli kennen.</Heading>
          <Paragraph>
            Jede Woche veranstalten wir einen Infoabend, zu dem wir jeden, der sich für die Emil Molt Akademie
            interessiert herzlich einladen.
          </Paragraph>
        </div>
        <div className="flex-1 divide-y overflow-hidden rounded-2xl border">
          {infoEveningDates.map((date, index) => (
            <div key={index} className={cn("flex items-center justify-between p-4", { "bg-primary-100": index === 0 })}>
              <div>
                <Heading size="sm" className="mb-0">
                  {new Date(date).toLocaleDateString("de", { weekday: "long", day: "numeric", month: "long" })}
                </Heading>
                <Label className="text-neutral-100-text-muted">
                  {new Date(date).toLocaleDateString("de", { year: "numeric" })}
                </Label>
              </div>
              <Label>{new Date(date).toLocaleTimeString("de", { timeStyle: "short" })} Uhr</Label>
            </div>
          ))}
        </div>
      </Container>

      <div className="bg-primary-900 py-32">
        <Container className="flex flex-col gap-16 sm:flex-row">
          <div className="flex-1">
            <SectionIndicator name="Persönliches Gespräch" icon={VideoIcon} on="dark" />
            <Heading className="mt-8 text-neutral-900-text">Persönliche Beratung</Heading>
            <Paragraph className="text-neutral-900-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum assumenda ipsam quia praesentium, at
              quisquam non similique eius alias. Voluptatum sed tempore animi est accusantium autem inventore cum quia
              nesciunt!
            </Paragraph>
          </div>
          <div className="flex-1">
            <TabList>
              <Tab active className="justify-start pl-2">
                <SectionIndicator name="Video-Call" icon={VideoIcon} on="dark" />
              </Tab>
              <Tab className="justify-start pl-2">
                <SectionIndicator name="An unserem Campus" icon={MapPinIcon} on="light" />
              </Tab>
            </TabList>
            <input
              className="mt-8 block w-full rounded-2xl border border-neutral-900-text bg-transparent p-4 font-serif text-neutral-900-text outline-none"
              type="email"
              placeholder="Deine Mailadresse"
            />
            <Button className="mt-8 w-full justify-center bg-primary-100 text-primary-100-text">
              <Label>Termin anfordern</Label>
              <ButtonInteractionBubble />
            </Button>

            <Paragraph className="mt-16 text-neutral-900-text-muted">
              Oder vereinbare einen Termin per Mail oder Telefon
            </Paragraph>
          </div>
        </Container>
      </div>

      <Container className="flex flex-col gap-16 pt-32 sm:flex-row sm:items-end sm:pb-32">
        <div className="flex-1">
          <SectionIndicator name="Mail & Telefon" icon={AtSignIcon} />
          <Heading className="mt-8">{"Schreib' eine Mail oder ruf' uns an."}</Heading>
          <Paragraph>Gerne kannst du uns auch eine Mail mit deinem Anliegen schreiben oder uns anrufen.</Paragraph>
        </div>
        <div className="flex-1">
          <div className="divide-y rounded-2xl border bg-transparent">
            <div className="px-4 py-6">
              <div className="flex items-center gap-2">
                <AtSignIcon />
                <Label>E-Mail</Label>
              </div>
              <Label className="mt-4 block">info@emil-molt-akademie.de</Label>
            </div>
            <div className="px-4 py-6">
              <div className="flex items-center gap-2">
                <PhoneCallIcon />
                <Label>Telefon</Label>
              </div>
              <Label className="mt-4 block">+49 30 53218343</Label>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;

type SectionIndicatorProps = ComponentProps<"div"> &
  VariantProps<typeof sectionIndicatorVariants> & {
    name: string;
    icon: LucideIcon;
  };

const sectionIndicatorVariants = cva("flex items-center gap-4", {
  variants: {
    on: {
      light: "[&>div]:bg-primary-900 [&>div]:text-primary-900-text [&>span]:text-neutral-100-text",
      dark: "[&>div]:bg-primary-100 [&>div]:text-primary-100-text [&>span]:text-neutral-900-text",
    },
  },
  defaultVariants: {
    on: "light",
  },
});

const SectionIndicator: FC<SectionIndicatorProps> = ({ className, name, icon: Icon, on, ...restProps }) => {
  return (
    <div className={cn(sectionIndicatorVariants({ on }), className)} {...restProps}>
      <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full">
        <Icon size="18" />
      </div>
      <Label>{name}</Label>
    </div>
  );
};
