import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import { AppointmentRequestForm } from "~/app/_components/compounds/appointment-request-form";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import { notFound } from "next/navigation";
import { ConsultingPageQueryResult } from "../../../../../../../generated/sanity/types";

const consultingPageQuery = groq`*[_type == "consulting-page"][0]`;

const ContactPage: FC = async () => {
  const consultingPageData = await sanityFetch<ConsultingPageQueryResult>(consultingPageQuery, {
    tags: ["consulting-page"],
  });

  if (!consultingPageData) notFound();

  return (
    <>
      <div className="relative pb-12">
        <div className="absolute left-0 top-0 -z-10 h-screen w-full bg-gradient-to-b from-neutral-200 to-neutral-100" />
        <Container className="z-10" width="narrow">
          <div className="mx-auto max-w-[35rem] text-balance py-28 text-center">
            <Heading>{consultingPageData.heading}</Heading>
            <Paragraph>{consultingPageData.description}</Paragraph>
          </div>
          <AppointmentRequestForm
            emailPlaceholder={consultingPageData.form?.emailInputPlaceholder || ""}
            submitButtonLabel={consultingPageData.form?.submitLabel || ""}
            successLabel={consultingPageData.form?.successLabel || ""}
            successText={consultingPageData.form?.successText || ""}
          />
        </Container>
      </div>
    </>
  );
};

export default ContactPage;
