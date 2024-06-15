"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@radix-ui/react-navigation-menu";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";

export default function () {
  return (
    <NavigationMenu skipDelayDuration={500}>
      <div className="sticky top-0 border-b bg-neutral-300 p-4">
        <Container>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem value="home">
              <NavigationMenuTrigger>Home</NavigationMenuTrigger>
            </NavigationMenuItem>
            <NavigationMenuItem value="about">
              <NavigationMenuTrigger>About</NavigationMenuTrigger>
              <NavigationMenuContent className="data-[motion='from-start']:animate-enterFromLeft data-[motion='from-end']:animate-enterFromRight data-[motion='to-start']:animate-exitToLeft data-[motion='to-end']:animate-exitToRigth absolute">
                <div>About content</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem value="programs">
              <NavigationMenuTrigger>Bildungswege</NavigationMenuTrigger>
              <NavigationMenuContent className="data-[motion='from-start']:animate-enterFromLeft data-[motion='from-end']:animate-enterFromRight data-[motion='to-start']:animate-exitToLeft data-[motion='to-end']:animate-exitToRigth absolute">
                <div>Bildungswege content</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuIndicator className="text-center transition-transform">•</NavigationMenuIndicator>
          </NavigationMenuList>
        </Container>
        <div className="absolute bottom-0 translate-y-[calc(100%+1px)]">
          <NavigationMenuViewport />
        </div>
      </div>
      <Container className="mt-60">
        <Heading>Content</Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus aliquam, dolorem dolore nostrum aliquid
          quidem magni nemo dignissimos reiciendis illo tempora repudiandae perspiciatis. Nulla ipsum similique saepe
          unde quos officiis.
        </Paragraph>
      </Container>
    </NavigationMenu>
  );
}
