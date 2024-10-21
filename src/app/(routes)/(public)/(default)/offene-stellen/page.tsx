import { groq } from "next-sanity";
import { FC } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionItemTriggerIndicator,
} from "~/app/_components/primitives/accordion";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import { JobsPageQueryResult, JobsPageMetaQueryResult } from "../../../../../../generated/sanity/types";
import { Button, ButtonInteractionBubble } from "~/app/_components/primitives/button";
import { Chip } from "~/app/_components/primitives/chip";
import { createGenerateMetadata } from "~/app/_utils/create-generate-meta";

const jobsPageQuery = groq`*[_type == "jobs-page"][0]`;

const jobsPageMetaQuery = groq`*[_type == "jobs-page"][0]{
  "title": coalesce(seo.title, ""),
  "description": coalesce(seo.description, ""),
}`;

export const generateMetadata = createGenerateMetadata<JobsPageMetaQueryResult>(jobsPageMetaQuery, {
  tags: ["jobs-page"],
});

const JobsPage: FC = async () => {
  const data = await sanityFetch<JobsPageQueryResult>(jobsPageQuery, { tags: ["jobs-page"] });

  return (
    <Container width="narrow" className="my-32 pt-header">
      <div className="text-center">
        <Heading tag="h1">{data?.heading}</Heading>
        <Paragraph>{data?.teaser}</Paragraph>
      </div>

      <Accordion className="mt-16">
        {data?.jobs?.map((job, index) => (
          <AccordionItem key={index} index={index}>
            <AccordionItemTrigger>
              <div className="w-full py-2">
                <div className="mt-2 flex items-center gap-4">
                  <Heading tag="h3" size="sm" className="my-0">
                    {job.title}
                  </Heading>
                  <AccordionItemTriggerIndicator className="ml-auto" />
                </div>
                <Label className="text-neutral-100-text-muted">{job.shortDescription}</Label>
                {job.isTeacherJob && (
                  <Chip className="mt-2 bg-primary-900 text-neutral-900-text">
                    <Label>{data.teachingJobLabel}</Label>
                  </Chip>
                )}
              </div>
            </AccordionItemTrigger>
            <AccordionItemContent>
              <div>
                <Paragraph className="my-0">{job.fullDescription}</Paragraph>
                <Button
                  href={`mailto:${job.contactEmail}`}
                  size="sm"
                  vairant="outline"
                  className="mt-4 transition-[padding] hover:pr-1"
                >
                  <Label>{data.CTALabel}</Label>
                  <ButtonInteractionBubble />
                </Button>
              </div>
            </AccordionItemContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
};

export default JobsPage;
