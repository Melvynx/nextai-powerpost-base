"use client";

import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/features/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Error</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardHeader>
            <CardTitle>
              Sorry, you need to be authenticated to access this resource.
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <Button onClick={reset}>Try again</Button>
          </CardFooter>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
