import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";
import { mockLibraryItems } from "@/data/mock-library";

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Authenticated Area"
        title="Library placeholder"
        description="Vista simples para validar grelhas de conteúdo, filtros e integração com mock data."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mockLibraryItems.map((item) => (
          <Card key={item.id}>
            <p className="text-xs uppercase tracking-[0.22em] text-accent-secondary">
              {item.category}
            </p>
            <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Estado atual: {item.status}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
