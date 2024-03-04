import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PostFormLoader = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>The post is creating...</CardTitle>
      </CardHeader>
      <CardContent>Des phrases qui tournes</CardContent>
    </Card>
  );
};
