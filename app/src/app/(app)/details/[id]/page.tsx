import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";

type DetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DetailsPage({ params }: DetailsPageProps) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Authenticated Area"
        title={`Details placeholder ${id}`}
        description="Estrutura inicial para a página de detalhe de um título, com hero, metadata e ações."
        action={<Badge>Details</Badge>}
      />
      <Card>
        <h3 className="text-lg font-semibold">Content summary area</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Este bloco serve para validar a composição base da página de detalhe.
        </p>
      </Card>
    </div>
  );
}
