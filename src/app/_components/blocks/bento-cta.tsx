import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../primitives/card";
import { SiteLogo } from "../compounds/site-logo";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { Button, ButtonInteractionBubble } from "../primitives/button";
import { TestimonialCard } from "../compounds/testimonial-card";
import { ArrowRightIcon } from "lucide-react";
import { InteractionBubble } from "../compounds/interaction-bubble";

export type BentoCTAProps = ComponentProps<"div"> & {};

export const BentoCTA: FC<BentoCTAProps> = ({ className, ...restProps }) => {
  return (
    <div className={cn("flex flex-col gap-4 xl:flex-row", className)} {...restProps}>
      <div className="flex flex-[2.5] flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <Card className="flex-[1.2] rounded-2xl border-none bg-primary-900 p-8">
            <SiteLogo show="mark" />
            <Heading tag="h3" className="mt-8 text-neutral-200">
              Jetzt durchstarten
            </Heading>
            <Paragraph className="text-neutral-100">
              Dein Weg zum Studium mit einer Ausbildung für eine soziale Zukunft.
            </Paragraph>
            <Button vairant="filled" href="/go" className="mt-12 bg-primary-100 text-primary-100-text">
              <Label>Online bewerben</Label>
              <ButtonInteractionBubble />
            </Button>
          </Card>
          <Card className="flex-[1] !rounded-2xl px-0 pt-0">
            <TestimonialCard
              rating={5}
              authorName="Menju"
              authorImage=""
              body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad optio sapiente ipsam expedita architecto maxime ratione? Reprehenderit beatae at debitis, blanditiis ipsam numquam quidem magnam expedita vitae incidunt fuga tempore."
            />
            <div className="px-8">
              <Button vairant="outline" href="/go" className="ml-auto">
                <ArrowRightIcon />
              </Button>
            </div>
          </Card>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a className="flex-[1]" href="/kontakt">
            <Card className="group bg-neutral-400">
              <Label className="">Lieber persönlich?</Label>
              <Heading size="sm" tag="h3" className="mt-3">
                Offene Beratung
              </Heading>
              <Paragraph className="mt-8">
                Dein Weg zum Studium mit einer Ausbildung für eine soziale Zukunft.
              </Paragraph>
              <div className="mt-12 flex h-8 items-center gap-0 transition-all group-hover:gap-4">
                <InteractionBubble />
                <Label>Mehr erfahren</Label>
              </div>
            </Card>
          </a>
          <a className="flex-[1]" href="/kontakt">
            <Card className="group bg-neutral-300">
              <Label className="">Lieber persönlich?</Label>
              <Heading size="sm" tag="h3" className="mt-3">
                Infoabend
              </Heading>
              <Paragraph className="mt-8">
                Dein Weg zum Studium mit einer Ausbildung für eine soziale Zukunft.
              </Paragraph>
              <div className="mt-12 flex h-8 items-center gap-0 transition-all group-hover:gap-4">
                <InteractionBubble />
                <Label>Mehr erfahren</Label>
              </div>
            </Card>
          </a>
        </div>
      </div>
      <Card className="flex-[1] !rounded-2xl p-8">
        <Heading tag="h3">Persönliches Gespräch</Heading>
        <Paragraph className="mt-8">Dein Weg zum Studium mit einer Ausbildung für eine soziale Zukunft.</Paragraph>
        <Button vairant="filled" href="/kontakt" className="mt-12 !rounded-full">
          <Label>Termin vereinbaren</Label>
          <ButtonInteractionBubble />
        </Button>
      </Card>
    </div>
  );
};
