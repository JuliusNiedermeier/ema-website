import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";

const ContactPage: FC = async () => {
  return (
    <>
      <div className="relative">
        <div className="absolute left-0 top-0 -z-10 h-screen w-full bg-gradient-to-b from-neutral-200 to-neutral-100" />
        <Container className="z-10">
          <div className="mx-auto max-w-[35rem] text-balance py-28 text-center">
            <Heading>Infoabend</Heading>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit cumque alias dolores sed consequuntur ipsa,
              est accusantium praesentium, eaque animi dolore beatae, sit nesciunt! Unde libero odit quos. Iste,
              perspiciatis.
            </Paragraph>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ContactPage;
