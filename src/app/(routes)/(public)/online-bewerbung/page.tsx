import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FC } from "react";
import { applicationCookieName } from "~/server/resources/application/application-cookie";
import { OnlineApplicationForm } from "~/app/_components/compounds/online-application-form";

const OnlineApplicationPage: FC = () => {
  if (cookies().has(applicationCookieName)) redirect("/online-bewerbung/bestaetigung");

  return <OnlineApplicationForm />;
};

export default OnlineApplicationPage;
