import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/ui/card";

type DashboardActionCardProps = {
  title: string;
  description: string;
  href: string;
};

export function DashboardActionCard({
  title,
  description,
  href,
}: DashboardActionCardProps) {
  return (
    <Link href={href} className="group">
      <Card className="h-full border border-white/8 bg-[linear-gradient(180deg,rgba(19,27,43,0.92),rgba(9,14,24,0.96))] transition group-hover:border-white/16 group-hover:bg-[linear-gradient(180deg,rgba(22,32,51,0.96),rgba(10,15,26,0.98))]">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm leading-6 text-[#aab5cc]">{description}</p>
          </div>
          <ChevronRight className="mt-1 h-5 w-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-white" />
        </div>
      </Card>
    </Link>
  );
}
