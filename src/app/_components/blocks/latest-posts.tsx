import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Label } from "../primitives/typography";
import { ArrowRight } from "lucide-react";
import { InteractionBubble } from "../compounds/interaction-bubble";
import Link from "next/link";
import { ProgressProvider } from "../primitives/progress-provider";
import { ScrollProgress } from "../primitives/scroll-progress";
import { ProgressBar, ProgressBarIndicator } from "../primitives/progress-bar";
import { CardCarousel, CardCarouselItem } from "../primitives/card-carousel";
import {
  PostCard,
  PostCardContent,
  PostCardMeta,
  PostCardThumbnail,
  PostCardThumbnailImage,
  PostCardThumbnailTag,
} from "../primitives/post-card";
import { AuthorTag, AuthorTagImage, AuthorTagName } from "../primitives/author-tag";

export type LatestPostsProps = ComponentProps<"div"> & {
  heading: string;
  allPostsLabel: string;
  posts: {
    image: { url: string; alt: string };
    title: string;
    slug: string;
    category: { name: string; slug: string };
    author: { name: string; image: { url: string; alt: string } };
  }[];
};

export const LatestPosts: FC<LatestPostsProps> = async ({ className, heading, allPostsLabel, posts, ...restProps }) => {
  return (
    <div className={cn("", className)} {...restProps}>
      <div className="flex items-center justify-between px-4">
        <Label>{heading}</Label>
        <Link href="/blog/alle" className="group flex items-center gap-2">
          <Label>{allPostsLabel}</Label>
          <ArrowRight className="transition-transform group-hover:translate-x-2" />
        </Link>
      </div>
      <ProgressProvider>
        <ScrollProgress className="scrollbar-none mt-4" asChild>
          <CardCarousel>
            {posts.map((post, index) => (
              <CardCarouselItem key={index} asChild>
                <Link href={`/blog/${post.category.slug}/${post.slug}`} className="flex-1">
                  <PostCard className="h-full">
                    <PostCardThumbnail className="">
                      <PostCardThumbnailImage src={post.image.url} alt={post.image.alt} />
                      <InteractionBubble className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                      <PostCardThumbnailTag>
                        <Label>{post.category.name}</Label>
                      </PostCardThumbnailTag>
                    </PostCardThumbnail>
                    <PostCardContent>
                      <Label className="leading-tight">{post.title}</Label>
                      <PostCardMeta className="mt-4">
                        <AuthorTag>
                          <AuthorTagImage src={post.author.image.url} alt={post.author.image.alt} />
                          <AuthorTagName>{post.author.name}</AuthorTagName>
                        </AuthorTag>
                      </PostCardMeta>
                    </PostCardContent>
                  </PostCard>
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
