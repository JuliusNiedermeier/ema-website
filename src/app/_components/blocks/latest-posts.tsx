import { groq } from "next-sanity";
import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { sanity } from "~/sanity/lib/client";
import { LatestPostsQueryResult } from "../../../../generated/sanity/types";
import Image from "next/image";
import { Label } from "../primitives/typography";
import { ArrowRight } from "lucide-react";
import { InteractionBubble } from "../compounds/interaction-bubble";
import Link from "next/link";
import { ProgressProvider } from "../primitives/progress-provider";
import { ScrollProgress } from "../primitives/scroll-progress";
import { ProgressBar, ProgressBarIndicator } from "../primitives/progress-bar";
import { CardCarousel, CardCarouselItem } from "../primitives/card-carousel";

const latestPostsQuery = groq`*[_type == "post"][0...3]{
    title,
    mainImage { asset -> { url } },
    slug
}`;

export type LatestPostsProps = ComponentProps<"div"> & {};

export const LatestPosts: FC<LatestPostsProps> = async ({ className, ...restProps }) => {
  const posts = await sanity.fetch<LatestPostsQueryResult>(latestPostsQuery);

  return (
    <div className={cn("", className)} {...restProps}>
      <div className="flex items-center justify-between px-4">
        <Label>Neuigkeiten</Label>
        <Link href="/blog" className="group flex items-center gap-2">
          <Label>Mehr anzeigen</Label>
          <ArrowRight className="transition-transform group-hover:translate-x-2" />
        </Link>
      </div>
      <ProgressProvider>
        <ScrollProgress className="scrollbar-none mt-4" asChild>
          <CardCarousel>
            {posts.map((post, index) => (
              <CardCarouselItem key={index} asChild>
                <Link href={`/blog/${post.slug?.current}`} className="group min-w-60 flex-1 rounded-3xl border p-2">
                  <div className="relative aspect-video overflow-hidden rounded-2xl">
                    <Image
                      src={post.mainImage?.asset?.url || ""}
                      alt={post.title || ""}
                      width="500"
                      height="500"
                      className="object-cover"
                    />
                    <InteractionBubble className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <Label className="block p-2">{post.title}</Label>
                </Link>
              </CardCarouselItem>
            ))}
          </CardCarousel>
        </ScrollProgress>
        <ProgressBar className="mx-8 mt-4 lg:hidden">
          <ProgressBarIndicator />
        </ProgressBar>
      </ProgressProvider>
    </div>
  );
};
