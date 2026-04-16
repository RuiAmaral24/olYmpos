import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Authenticated Area"
        title="Dashboard placeholder"
        description="A shell autenticada já está pronta para receber widgets, métricas e recomendações."
        action={<Badge>Overview</Badge>}
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <h3 className="text-lg font-semibold">Continue Watching</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Zona reservada para progresso recente e conteúdo em destaque.
          </p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Top Picks</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Bloco pronto para curadoria e recomendações personalizadas.
          </p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Activity</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Espaço para histórico, alertas e pequenos insights da conta.
          </p>
        </Card>
      </div>
    </div>
  );
}
