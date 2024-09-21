import { ComponentProps, FC } from "react";
import { FormProvider } from "./provider";
import { FormNavigation } from "./navigation";
import { cn } from "~/app/_utils/cn";
import { FormCarousel } from "./carousel";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import { OnlineApplicationFormProgramTypesQueryResult } from "../../../../../generated/sanity/types";
import { ensureValidHSL } from "~/app/_utils/color-swatch";
import { FormProgressIndicator } from "./progress-indicator";
import { SiteLogo } from "../site-logo";
import { FormLeaveButton } from "./utils/leave-button";

const onlineApplicationFormProgramTypesQuery = groq`*[_type == "educational-program-type"] {
  _id,
  name,
  color,
  "programs": *[_type == "educational-program" && educationalProgramType._ref == ^._id] {
    _id,
    name,
  }
}`;

type OnlineApplicationFormProps = Omit<ComponentProps<"div">, "children"> & {};

export const OnlineApplicationForm: FC<OnlineApplicationFormProps> = async ({ className, ...restProps }) => {
  const programTypes = await sanityFetch<OnlineApplicationFormProgramTypesQueryResult>(
    onlineApplicationFormProgramTypesQuery,
    {
      tags: ["educational-program-type", "educational-program"],
    },
  );

  const programs = programTypes
    .map((programType) =>
      programType.programs.map<ComponentProps<typeof FormProvider>["stepData"]["program"]["programs"][number]>(
        (program) => ({
          ID: program._id,
          name: program.name || "",
          type: programType.name || "",
          color: ensureValidHSL(programType.color?.hsl),
        }),
      ),
    )
    .flat();

  return (
    <FormProvider
      stepData={{
        introduction: {
          heading: "Melde dich jetzt ganz einfach online an.",
          description:
            "Du kannst uns online deine Entscheidung mitteilen, deine Ausbildung bei uns machen zu wollen. Wir antworten dir so schnell wir können, und lassen dich wissen, ob du deinen Ausbildungsplatz bekommst.",
        },
        program: { heading: "Wofür möchtest du dich bewerben?", programs },
        name: {
          heading: "Wie möchtest du genannt werden?",
          description: "Verrate uns deinen Namen, bevor wir uns besser kennenlernen.",
          placeholder: "Dein Name",
        },
        age: {
          heading: "Verrate uns dein Alter.",
          description:
            "Um zu prüfen ob du die VOraussetzungen für die Ausbildung erfüllst, müssen wir dein Alter wissen..",
          placeholder: "Dein Alter",
        },
        email: {
          heading: "Wohin sollen wir dir schreiben?.",
          description: "Um dich zu kontaktieren benötigen wir deine Email-Adresse.",
          placeholder: "Deine Email-Adresse",
        },
      }}
    >
      <div className={cn("flex w-full flex-col justify-end rounded-md", className)} {...restProps}>
        <div className="sticky top-0 z-10 mb-[20svh] flex items-center gap-8 rounded-b-[2.5rem] bg-primary-900/80 p-[1rem] backdrop-blur-md">
          <FormLeaveButton />
          <div>
            <SiteLogo show="text" variant="light" />
            <FormProgressIndicator className="mt-4" />
          </div>
        </div>

        <FormCarousel className="mt-auto px-4" />

        <FormNavigation
          className="sticky bottom-0 mt-8 h-fit rounded-t-[3rem] bg-primary-900/80 p-[1rem] backdrop-blur-md"
          buttonLabels={{ start: "Los geht's", back: "Zurück", next: "Weiter", submit: "Fertigstellen" }}
          verifyPath="/online-bewerbung/bestaetigung"
        />
      </div>
    </FormProvider>
  );
};
