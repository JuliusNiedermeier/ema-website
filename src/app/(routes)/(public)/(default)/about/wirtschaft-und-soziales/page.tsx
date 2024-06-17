import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";

const EconomyXSocialPage: FC = () => {
  return (
    <Container width="narrow" className="my-32 text-center">
      <Heading>
        Wir verbinden
        <br />
        Wirtschaft & Soziales
      </Heading>
      <Paragraph>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor assumenda obcaecati aperiam, nisi quia
        voluptatibus possimus maxime similique tempora dicta quos molestias sed reprehenderit quis sapiente optio
        voluptas quam aliquam!
      </Paragraph>
    </Container>
  );
};

export default EconomyXSocialPage;
