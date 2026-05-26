import Link from "next/link";
import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export default function DetailsNotFound() {
  return (
    <div className="pb-8">
      <EmptyState
        eyebrow="Item Not Found"
        title="This title is not in your olYmpos"
        description="It may have been deleted, or the link may point to an entry outside your library."
        icon={<SearchX className="h-5 w-5" />}
        action={(
          <Link href="/library">
            <Button className="h-11 rounded-2xl px-5">Back to Library</Button>
          </Link>
        )}
      />
    </div>
  );
}
