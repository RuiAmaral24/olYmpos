import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/ui/section-title";

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-xl items-center">
      <Card className="w-full space-y-6">
        <SectionTitle
          eyebrow="Public Area"
          title="Login placeholder"
          description="Mock simples para validar o layout público e a base visual dos formulários."
        />
        <div className="space-y-4">
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />
        </div>
        <Button className="w-full">Enter olYmpos</Button>
      </Card>
    </div>
  );
}
