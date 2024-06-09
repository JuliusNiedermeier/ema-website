import { FC } from "react";
import { Card } from "~/app/_components/primitives/card";
import { Container } from "~/app/_components/primitives/container";
import { Heading } from "~/app/_components/primitives/typography";

const CheckupPage: FC = () => {
  return (
    <>
      <Container>
        <Heading>
          Mit unserem Checkup <br />
          zum passenden Bildungsweg
        </Heading>
      </Container>
      <Container width="wide" asChild>
        <Card className="min-h-[80vh]"></Card>
      </Container>
    </>
  );
};

export default CheckupPage;
