import { FC } from "react";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import { useApplicationFormState } from "../state";

export const EmailStep: FC = () => {
  const { email, setEmail } = useApplicationFormState();

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <Heading size="sm">Fast geschafft!</Heading>
      <Paragraph>Wir brauchen nur noch deine Email um dir unsere Zusage mitzuteilen.</Paragraph>
      <input
        autoFocus
        type="email"
        placeholder="Deine Email"
        className="max-w-96x bg-transparent p-8 text-center text-heading-lg outline-none"
        value={email || ""}
        onInput={(e) => setEmail(e.currentTarget.value)}
      />
    </div>
  );
};
