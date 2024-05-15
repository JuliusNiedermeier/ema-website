import { FC } from "react";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import { useApplicationFormState } from "../state";

export const MotivationStep: FC = () => {
  const { motivation, setMotivation } = useApplicationFormState();

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <Heading size="sm">Erzäle uns weshalb du dich bei uns bewirbst.</Heading>
      <Paragraph>Hier kannst du uns in ein paar Sätzen deine Motivation mitteilen, dich bei uns zu bewerben.</Paragraph>
      <textarea
        autoFocus
        placeholder="Ich bewerbe mich weil..."
        className="max-w-96x bg-transparent p-8 text-center text-heading-lg outline-none"
        value={motivation || ""}
        onInput={(e) => setMotivation(e.currentTarget.value)}
      />
    </div>
  );
};
