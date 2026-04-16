import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/ui/section-title";

export default function SignupPage() {
  return (
    <div className="mx-auto flex w-full max-w-xl items-center">
      <Card className="w-full space-y-6">
        <SectionTitle
          eyebrow="Public Area"
          title="Sign up placeholder"
          description="Estrutura inicial para onboarding, criação de conta e primeiros passos do utilizador."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input placeholder="First name" />
          <Input placeholder="Last name" />
        </div>
        <div className="space-y-4">
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />
        </div>
        <Button className="w-full">Create account</Button>
      </Card>
    </div>
  );
}
