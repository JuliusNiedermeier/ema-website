import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";

const FeesPage: FC = async () => {
  return (
    <Container width="narrow" className="my-32">
      <Heading>Schulbeitrag</Heading>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet aliquid consectetur, doloremque architecto
        aliquam quae. Minus, porro laudantium? Facere tempora perspiciatis minima impedit illo ducimus fugit totam
        distinctio atque expedita?
      </Paragraph>
    </Container>
  );
};

export default FeesPage;
