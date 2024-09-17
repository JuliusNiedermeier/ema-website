import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import Image from "next/image";
import { ProgramSubjectMatrix } from "~/app/_components/blocks/program-subject-matrix";

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
        <ProgramSubjectMatrix />
      </Container>
    </div>
  );
};

export default ÜbersichtPage;
