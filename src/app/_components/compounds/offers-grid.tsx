import { ComponentProps, FC } from "react";
import {
  OfferDescription,
  OfferCard,
  OfferGroupCollection,
  OfferGroupDescription,
  OfferGroupHeader,
  OfferGroupTitle,
  OfferTitle,
} from "../primitives/offers/offers";
import { groq } from "next-sanity";
import { sanity } from "~/sanity/lib/client";
import { EducationPathsQueryResult, EducationOffersQueryResult } from "../../../../generated/sanity/types";
import { OfferGroup, OfferGroupCard, OfferGroupWindow, OffersGroupTab } from "../primitives/offers/client";
import { groupBy } from "~/app/_utils/group-by";
import Link from "next/link";
import { TabList } from "../primitives/tabs";

export type OfferGridProps = ComponentProps<typeof OfferGroupCollection> & {};

const educationPathsQuery = groq`*[_type == "educationPath"] | order(order asc) {...}`;
const educationOffersQuery = groq`*[_type == "education"] | order(order asc) {...}`;

export const OffersGrid: FC<OfferGridProps> = async ({ ...restProps }) => {
  const educationPaths = await sanity.fetch<EducationPathsQueryResult>(educationPathsQuery);
  const educationOffers = await sanity.fetch<EducationOffersQueryResult>(educationOffersQuery);

  const offerGroups = educationPaths.map((path) => {
    const offers = educationOffers.filter((offer) => offer.educationPath?._ref === path._id);
    const variants = groupBy(offers, (offer) => offer.variant || "default");
    return { ...path, variants };
  });

  return (
    <OfferGroupCollection {...restProps}>
      {offerGroups.map((path) => (
        <OfferGroupCard key={path._id} style={{ backgroundColor: path.color }}>
          <OfferGroupHeader>
            <OfferGroupTitle>{path.title}</OfferGroupTitle>
            <OfferGroupDescription>{path.description}</OfferGroupDescription>
          </OfferGroupHeader>

          {Object.keys(path.variants).length > 1 && (
            <div className="mb-2">
              <TabList data-offer-group-tabs>
                {Object.keys(path.variants).map((variant, index) => (
                  <OffersGroupTab key={variant} index={index} interactive>
                    {variant}
                  </OffersGroupTab>
                ))}
              </TabList>
            </div>
          )}

          <OfferGroupWindow>
            {Object.keys(path.variants).map((variant, index) => (
              <OfferGroup key={variant} index={index} className="min-w-[100%] max-w-[100%]">
                {path.variants[variant]?.map((offer, index) => (
                  <Link key={offer._id} className="flex-1" href={`/bildungswege/${offer.slug?.current}`}>
                    <OfferCard className="h-full" style={{ backgroundColor: offer.colors?.primary }}>
                      <OfferTitle>{offer.title}</OfferTitle>
                      <OfferDescription>{offer.description}</OfferDescription>
                    </OfferCard>
                  </Link>
                ))}
              </OfferGroup>
            ))}
          </OfferGroupWindow>
        </OfferGroupCard>
      ))}
    </OfferGroupCollection>
  );
};
