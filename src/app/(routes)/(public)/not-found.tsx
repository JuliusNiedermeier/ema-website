import { FC } from "react";
import { Button, ButtonInteractionBubble } from "~/app/_components/primitives/button";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label } from "~/app/_components/primitives/typography";

const NotFoundPage: FC = () => {
  return (
    <Container className="grid place-items-center gap-8 py-64">
      <Heading>404</Heading>
      <Button vairant="outline" href="/">
        <Label>Zur Startseite</Label>
        <ButtonInteractionBubble />
      </Button>
    </Container>
  );
};

export default NotFoundPage;
