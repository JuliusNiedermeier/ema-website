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
          <Label>Alle posts</Label>
          <ArrowRight className="transition-transform group-hover:translate-x-2" />
        </Link>
      </div>
      <div className="mt-4 flex gap-4">
        {posts.map((post, index) => (
          <Link key={index} href={`/blog/${post.slug?.current}`} className="group flex-1 rounded-3xl border p-2">
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
        ))}
      </div>
    </div>
  );
};
