import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FC } from "react";
import { applicationCookieName } from "~/server/resources/application/application-cookie";
import { OnlineApplicationForm } from "~/app/_components/compounds/online-application-form";
import { groq } from "next-sanity";
import { createGenerateMetadata } from "~/app/_utils/create-generate-meta";
import { ApplicationPageMetaQueryResult } from "../../../../../generated/sanity/types";

const applicationPageMetaQuery = groq`*[_type == "application-page"][0]{
  "title": coalesce(seo.title, ""),
  "description": coalesce(seo.description, ""),
}`;

export const generateMetadata = createGenerateMetadata<ApplicationPageMetaQueryResult>(applicationPageMetaQuery, {
  tags: ["application-page"],
});

const OnlineApplicationPage: FC = () => {
  if (cookies().has(applicationCookieName)) redirect("/online-bewerbung/bestaetigung");

  return <OnlineApplicationForm />;
};

export default OnlineApplicationPage;
