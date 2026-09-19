import Link from "next/link";
import { LockKeyhole } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ReviewNotFound() {
  return (
    <Card className="mx-auto max-w-xl space-y-5 rounded-2xl p-8 text-center">
      <LockKeyhole className="mx-auto h-8 w-8 text-[#a78bfa]" />
      <div><h1 className="section-subtitle">Review unavailable</h1><p className="mt-3 text-sm leading-7 text-[#9da6bc]">This review does not exist or is not available to your account.</p></div>
      <Link href="/dashboard" className={buttonVariants("secondary")}>Back to dashboard</Link>
    </Card>
  );
}
