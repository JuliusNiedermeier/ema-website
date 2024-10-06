import { ComponentProps, FC } from "react";
import { FormProvider } from "./provider";
import { FormNavigation } from "./navigation";
import { cn } from "~/app/_utils/cn";
import { FormCarousel } from "./carousel";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import {
  OnlineApplicationFormPageQueryResult,
  OnlineApplicationFormProgramTypesQueryResult,
} from "../../../../../generated/sanity/types";
import { ensureValidHSL } from "~/app/_utils/color-swatch";
import { FormProgressIndicator } from "./progress-indicator";
import { SiteLogo } from "../site-logo";
import { FormLeaveButton } from "./utils/leave-button";

const onlineApplicationFormProgramTypesQuery = groq`*[_type == "educational-program-type"] | order(order asc) {
  _id,
  name,
  color,
  "programs": *[_type == "educational-program" && educationalProgramType._ref == ^._id] | order(order asc) {
    _id,
    name,
  }
}`;

const onlineApplicationFormPageQuery = groq`*[_type == "application-page"][0]`;

type OnlineApplicationFormProps = Omit<ComponentProps<"div">, "children"> & {};

export const OnlineApplicationForm: FC<OnlineApplicationFormProps> = async ({ className, ...restProps }) => {
  const programTypes = await sanityFetch<OnlineApplicationFormProgramTypesQueryResult>(
    onlineApplicationFormProgramTypesQuery,
    {
      tags: ["educational-program-type", "educational-program"],
    },
  );

  const pageData = await sanityFetch<OnlineApplicationFormPageQueryResult>(onlineApplicationFormPageQuery, {
    tags: ["application-page"],
  });

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
          heading: pageData?.steps?.introduction?.heading || "",
          description: pageData?.steps?.introduction?.description || "",
        },
        program: { heading: pageData?.steps?.program?.heading || "", programs },
        name: {
          heading: pageData?.steps?.name?.heading || "",
          description: pageData?.steps?.name?.description || "",
          placeholder: pageData?.steps?.name?.placeholder || "",
        },
        age: {
          heading: pageData?.steps?.age?.heading || "",
          description: pageData?.steps?.age?.description || "",
          placeholder: pageData?.steps?.age?.placeholder || "",
        },
        email: {
          heading: pageData?.steps?.email?.heading || "",
          description: pageData?.steps?.email?.description || "",
          placeholder: pageData?.steps?.email?.placeholder || "",
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
          buttonLabels={{
            start: pageData?.navigation?.startLabel || "",
            back: pageData?.navigation?.backLabel || "",
            next: pageData?.navigation?.nextLabel || "",
            submit: pageData?.navigation?.submitLabel || "",
          }}
          verifyPath="/online-bewerbung/bestaetigung"
        />
      </div>
    </FormProvider>
  );
};
