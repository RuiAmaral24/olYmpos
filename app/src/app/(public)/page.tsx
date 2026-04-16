import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";

export default function LandingPage() {
  return (
    <div className="flex w-full flex-col gap-8 py-8">
      <Card className="overflow-hidden px-8 py-12 sm:px-12">
        <div className="space-y-6">
          <Badge>Premium Streaming</Badge>
          <SectionTitle
            eyebrow="Public Area"
            title="olYmpos landing placeholder"
            description="A primeira base visual já está pronta para a navegação pública, hero sections e highlights da plataforma."
            action={<Button className="w-fit">Start Exploring</Button>}
          />
        </div>
      </Card>

      <section id="features" className="grid gap-4 md:grid-cols-3">
        <Card>
          <h3 className="text-lg font-semibold">Hero Ready</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Espaço preparado para introduzir proposta de valor, CTA e visual principal.
          </p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Navigation Split</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            A app pública e a app autenticada já estão separadas por route groups.
          </p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Reusable UI</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Os componentes base já seguem o mesmo tema dark premium do projeto.
          </p>
        </Card>
      </section>
    </div>
  );
}
