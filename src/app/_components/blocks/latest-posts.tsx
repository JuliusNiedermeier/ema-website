import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import Image from "next/image";
import { Label } from "../primitives/typography";
import { ArrowRight } from "lucide-react";
import { InteractionBubble } from "../compounds/interaction-bubble";
import Link from "next/link";
import { ProgressProvider } from "../primitives/progress-provider";
import { ScrollProgress } from "../primitives/scroll-progress";
import { ProgressBar, ProgressBarIndicator } from "../primitives/progress-bar";
import { CardCarousel, CardCarouselItem } from "../primitives/card-carousel";
import { PostCardThumbnailTag } from "../primitives/post-card";

export type LatestPostsProps = ComponentProps<"div"> & {
  heading: string;
  allPostsLabel: string;
  posts: { imageURL: string; title: string; slug: string; category: string }[];
};

export const LatestPosts: FC<LatestPostsProps> = async ({ className, heading, allPostsLabel, posts, ...restProps }) => {
  return (
    <div className={cn("", className)} {...restProps}>
      <div className="flex items-center justify-between px-4">
        <Label>{heading}</Label>
        <Link href="/blog" className="group flex items-center gap-2">
          <Label>{allPostsLabel}</Label>
          <ArrowRight className="transition-transform group-hover:translate-x-2" />
        </Link>
      </div>
      <ProgressProvider>
        <ScrollProgress className="scrollbar-none mt-4" asChild>
          <CardCarousel>
            {posts.map((post, index) => (
              <CardCarouselItem key={index} asChild>
                <Link href={`/blog/${post.slug}`} className="group min-w-60 flex-1 rounded-3xl border p-2">
                  <div className="relative aspect-video overflow-hidden rounded-2xl">
                    <Image
                      src={post.imageURL}
                      alt={post.title}
                      width="500"
                      height="500"
                      className="w-full object-cover"
                    />
                    <InteractionBubble className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                    <PostCardThumbnailTag>{post.category}</PostCardThumbnailTag>
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
