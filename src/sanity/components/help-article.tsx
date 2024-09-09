import { Button, Container, Heading, Text } from "@sanity/ui";
import { FileTextIcon } from "lucide-react";
import { FC } from "react";
import { env } from "~/env";

export const HelpArticle: FC = () => {
  return (
    <Container style={{ paddingBlock: "4rem" }}>
      <Heading size={5}>Hilfe</Heading>
      <Text style={{ marginTop: "1rem" }}>Hier entsteht ein ausführlicher Hilfebereich für Editoren.</Text>
      <Text style={{ marginTop: "4rem" }}>
        Vorerst verlinke ich hier nur auf ein Google Doc, das die wichtigsten Infos zum Ändern von Website-Inhalten
        enthält.
      </Text>
      <a href={env.NEXT_PUBLIC_EDITOR_ONBOARDING_DOCUMENT_URL} target="_blank">
        <Button tone="primary" padding={4} icon={FileTextIcon} text="Zum Google Doc" style={{ marginTop: "1rem" }} />
      </a>
    </Container>
  );
};
