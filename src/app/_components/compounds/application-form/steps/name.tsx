import { FC } from "react";
import { Heading } from "~/app/_components/primitives/typography";
import { useApplicationFormState } from "../state";

export const NameStep: FC = () => {
  const { name, setName } = useApplicationFormState();

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <Heading size="sm">Wie willst du genannt werden?</Heading>
      <input
        autoFocus
        type="text"
        placeholder="Dein name"
        className="max-w-96x bg-transparent p-8 text-center text-heading-lg outline-none"
        value={name || ""}
        onInput={(e) => setName(e.currentTarget.value)}
      />
    </div>
  );
};
