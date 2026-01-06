// components/user-profile/ui/SectionCard.tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export const SectionCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Card className="shadow-none">
    <CardHeader>
      <h2 className="text-lg font-semibold">{title}</h2>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
