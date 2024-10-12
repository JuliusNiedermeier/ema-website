import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { AppointmentRequestForm } from "~/app/_components/compounds/appointment-request-form";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import { notFound } from "next/navigation";
import {
  ConsultingPageQueryResult,
  ConsultingPagePrivacyPageQueryResult,
  ConsultingPageInfoEventPageQueryResult,
} from "../../../../../../../generated/sanity/types";
import { IconChip } from "~/app/_components/primitives/icon-chip";
import { CalendarCheckIcon, CheckIcon, type LucideIcon, MoveRightIcon, SendHorizonalIcon } from "lucide-react";
import { IconListItem, IconListItemIcon } from "~/app/_components/primitives/icon-list";
import { TestimonialCarousel } from "~/app/_components/blocks/testimonial-carousel";
import { AuthorTagImage } from "~/app/_components/primitives/author-tag";
import { cn } from "~/app/_utils/cn";
import { EndOfPageCTA } from "~/app/_components/compounds/end-of-page-cta";
import { Button } from "~/app/_components/primitives/button";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";

const consultingPageQuery = groq`*[_type == "consulting-page"][0] {
  heading,
  teaser,
  steps,
  form,
  benefits,
  alternativeCTA,
  consultants[] { alt, asset -> { url } }
}`;

const consultingPagePrivacyPageQuery = groq`*[_type == "privacy-page"][0] {
  navigationLabel
}`;

const consultingPageInfoEventPageQuery = groq`*[_type == "info-event-page"][0] {
  readMoreLabel
}`;

const ContactPage: FC = async () => {
  const consultingPageData = await sanityFetch<ConsultingPageQueryResult>(consultingPageQuery, {
    tags: ["consulting-page"],
  });

  if (!consultingPageData) notFound();

  const privacyPageData = await sanityFetch<ConsultingPagePrivacyPageQueryResult>(consultingPagePrivacyPageQuery, {
    tags: ["privacy-page"],
  });

  const infoEventPageData = await sanityFetch<ConsultingPageInfoEventPageQueryResult>(
    consultingPageInfoEventPageQuery,
    {
      tags: ["info-event-page"],
    },
  );

  return (
    <>
      <div className="relative pb-32 pt-header">
        <div className="absolute left-0 top-0 -z-10 h-screen w-full" />
        <Container className="z-10 pt-20" width="narrow">
          <div className="mx-auto max-w-[35rem] text-center">
            <Heading>{consultingPageData.heading}</Heading>
            <Paragraph>{consultingPageData.teaser}</Paragraph>
          </div>

          <div className="flex items-center justify-center">
            {consultingPageData.consultants?.map((consultant, index) => (
              <AuthorTagImage
                key={index}
                src={consultant.asset?.url || ""}
                alt={consultant.alt || ""}
                className={cn("h-12 w-12 border-4 border-neutral-200", { "-ml-4": index > 0 })}
              />
            ))}
          </div>

          <div className="mt-16 flex justify-center gap-4">
            <StepItem text={consultingPageData.steps?.sendEmailLabel || ""} icon={SendHorizonalIcon} />
            <MoveRightIcon className="mt-3 text-primary-900" />
            <StepItem text={consultingPageData.steps?.recieveAppointmentLabel || ""} icon={CalendarCheckIcon} />
          </div>

          <AppointmentRequestForm
            className="mt-10"
            emailPlaceholder={consultingPageData.form?.emailInputPlaceholder || ""}
            submitButtonLabel={consultingPageData.form?.submitLabel || ""}
            successLabel={consultingPageData.form?.successLabel || ""}
            successText={consultingPageData.form?.successText || ""}
            privacyLinkLabel={privacyPageData?.navigationLabel || ""}
          />
          <div className="mt-4 flex justify-center">
            <div className="flex w-fit flex-wrap gap-4">
              {consultingPageData.benefits?.map((benefit, index) => (
                <IconListItem key={index} className="w-fit">
                  <IconListItemIcon>
                    <CheckIcon />
                  </IconListItemIcon>
                  <Label>{benefit}</Label>
                </IconListItem>
              ))}
            </div>
          </div>
        </Container>

        <Container className="mt-8">
          <TestimonialCarousel />
        </Container>

        <EndOfPageCTA
          className="mt-12"
          heading={consultingPageData.alternativeCTA?.heading || ""}
          description={consultingPageData.alternativeCTA?.description || ""}
        >
          <Container className="-mt-12">
            <Button href="/kontakt/info-abend" className="mx-auto gap-4 pr-4">
              <Label>{infoEventPageData?.readMoreLabel}</Label>
              <InteractionBubble animated={false} className="bg-primary-100 text-primary-100-text" />
            </Button>
          </Container>
        </EndOfPageCTA>
      </div>
    </>
  );
};

export default ContactPage;

const StepItem: FC<{ text: string; icon: LucideIcon }> = ({ text, icon: Icon }) => {
  return (
    <div className="flex max-w-40 flex-col items-center gap-2 text-center">
      <IconChip>
        <Icon />
      </IconChip>
      <Label className="text-neutral-100-text-muted">{text}</Label>
    </div>
  );
};
