import Link from "next/link";
import { UserRoundX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export default function PublicProfileNotFound() {
  return (
    <div className="pb-8">
      <EmptyState
        eyebrow="Profile Not Found"
        title="This member could not be found"
        description="The username may have changed, or the profile is no longer available."
        icon={<UserRoundX className="h-5 w-5" />}
        action={(
          <Link href="/dashboard">
            <Button className="h-11 rounded-xl px-5">Back to Dashboard</Button>
          </Link>
        )}
      />
    </div>
  );
}
