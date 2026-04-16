import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Authenticated Area"
        title="Profile placeholder"
        description="Base pronta para conta, preferências e gestão de subscrição."
        action={<Badge>Account</Badge>}
      />
      <Card className="space-y-3">
        <h3 className="text-lg font-semibold">Viewer profile</h3>
        <p className="text-sm text-muted-foreground">
          Aqui vamos encaixar dados pessoais, avatar, plano e preferências de reprodução.
        </p>
      </Card>
    </div>
  );
}
