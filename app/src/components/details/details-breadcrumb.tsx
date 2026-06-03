import Link from "next/link";
import { ChevronRight } from "lucide-react";

type DetailsBreadcrumbProps = {
  category: string;
  title: string;
};

export function DetailsBreadcrumb({
  category,
  title,
}: DetailsBreadcrumbProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[#9a8cff]">
      <Link href="/library" className="transition hover:text-[#c4b5fd]">
        Library
      </Link>
      <ChevronRight className="h-4 w-4 text-[#6b7280]" />
      <span className="text-[#9a8cff]">{category}</span>
      <ChevronRight className="h-4 w-4 text-[#6b7280]" />
      <span className="text-[#b8c1ec]">{title}</span>
    </div>
  );
}
