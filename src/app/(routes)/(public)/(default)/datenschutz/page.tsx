import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";

const PrivacyPage: FC = () => {
  return (
    <Container width="narrow" className="my-32">
      <Heading>Datenschutz</Heading>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque obcaecati unde quam fuga omnis magni
        repellendus nisi quas, ad fugiat eius aliquid itaque quia beatae, consequatur ea deserunt exercitationem
        voluptatum?
      </Paragraph>
    </Container>
  );
};

export default PrivacyPage;
