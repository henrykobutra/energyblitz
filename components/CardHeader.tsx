import {
  CardHeader as UICardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function CardHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <UICardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </UICardHeader>
  );
}
