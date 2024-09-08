import { groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import { notFound } from "next/navigation";
import { ContactPage2QueryResult } from "../../../../../../../generated/sanity/types";
import { AppointmentRequestForm } from "~/app/_components/compounds/appointment-request-form";

const contactPage2Query = groq`*[_type == "contact-page"][0]`;

const ContactPage: FC = async () => {
  const pageData = await sanityFetch<ContactPage2QueryResult>(contactPage2Query, { tags: ["contact-page"] });

  if (!pageData) notFound();

  return (
    <>
      <div className="relative pb-12">
        <div className="absolute left-0 top-0 -z-10 h-screen w-full bg-gradient-to-b from-neutral-200 to-neutral-100" />
        <Container className="z-10" width="narrow">
          <div className="mx-auto max-w-[35rem] text-balance py-28 text-center">
            <Heading>Vereinbare ein persönliches Gespräch</Heading>
            <Paragraph>Mach den nächsten schritt für deine Zukunft und schreib uns ne Nachricht!</Paragraph>
          </div>
          <AppointmentRequestForm emailPlaceholder="Email" submitButtonLabel="Anfragen" />
        </Container>
      </div>
    </>
  );
};

export default ContactPage;
