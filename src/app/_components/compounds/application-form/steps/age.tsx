import { FC } from "react";
import { Heading } from "~/app/_components/primitives/typography";
import { useApplicationFormState } from "../state";

export const AgeStep: FC = () => {
  const { age, setAge } = useApplicationFormState();

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <Heading size="sm">Wie alt bist du?</Heading>
      <input
        autoFocus
        type="text"
        placeholder="18"
        className="max-w-96x bg-transparent p-8 text-center text-heading-lg outline-none"
        value={age || ""}
        onInput={(e) => setAge(Number(e.currentTarget.value))}
      />
    </div>
  );
};
