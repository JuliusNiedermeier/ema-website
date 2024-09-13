import { CheckIcon, MinusIcon } from "lucide-react";
import { FC, Fragment } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { cn } from "~/app/_utils/cn";
import Image from "next/image";

const xCount = 7;
const yCount = 15;

const ÜbersichtPage: FC = () => {
  return (
    <div className="bg-neutral-200 py-32">
      <Container width="narrow" className="mt-header text-center">
        <Heading>Alle Bildungsgänge im Überblick</Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque ipsum similique nihil hic quidem non ad, ex
          nisi natus nostrum earum dolorem, unde, distinctio placeat dolor vero obcaecati quas labore!
        </Paragraph>
      </Container>

      <Container className="mt-24 overflow-hidden rounded-3xl border border-neutral-400">
        <Image src="/overview.svg" width="2000" height="2000" alt="overview" />
      </Container>

      <Container width="narrow" className="mt-64 text-center">
        <Heading>Alle Fächer im Überblick</Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque ipsum similique nihil hic quidem non ad, ex
          nisi natus nostrum earum dolorem, unde, distinctio placeat dolor vero obcaecati quas labore!
        </Paragraph>
      </Container>

      <Container className="mt-24">
        <div
          className="relative grid overflow-x-auto overflow-y-hidden rounded-3xl border"
          style={{
            gridTemplateColumns: `repeat(${xCount},min-content)`,
            // gridTemplateRows: `repeat(${yCount},fit-content)`,
          }}
        >
          {Array.from(new Array(yCount)).map((_, yIndex) =>
            Array.from(new Array(xCount)).map((_, xIndex) => {
              const checked = Boolean(Math.round(Math.random()));
              return (
                <Fragment key={`${yIndex}-${xIndex}`}>
                  {yIndex === 0 && xIndex === 0 ? (
                    <div className="bg-[#e38264]" />
                  ) : yIndex === 0 ? (
                    <div
                      className={cn("bg-[#e38264] p-4", {
                        "border-l border-neutral-100-text-muted": xIndex > 0,
                      })}
                    >
                      <Label className="block text-neutral-100-text-muted">Fachschule</Label>
                      <Label>Heilerziehungspflege</Label>
                    </div>
                  ) : xIndex === 0 ? (
                    <div className="sticky left-0 overflow-hidden border-r border-t border-neutral-400 bg-neutral-200 p-4">
                      <Label className="text-neutral-200-text">Politikwissenschaften</Label>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "wrap grid place-content-center border-l border-t border-neutral-400 bg-neutral-200 p-2",
                        { "bg-primary-900/10": checked },
                      )}
                    >
                      {checked && (
                        <div className={cn("rounded-xl bg-primary-900 p-2 text-primary-900-text")}>
                          <CheckIcon />
                        </div>
                      )}
                    </div>
                  )}
                </Fragment>
              );
            }),
          )}
        </div>
      </Container>
    </div>
  );
};

export default ÜbersichtPage;
