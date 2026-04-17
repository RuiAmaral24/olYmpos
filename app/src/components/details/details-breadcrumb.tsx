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
    <div className="flex flex-wrap items-center gap-2 text-sm text-[#95a4bf]">
      <Link href="/library" className="transition hover:text-white">
        Library
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span>{category}</span>
      <ChevronRight className="h-4 w-4" />
      <span className="text-[#dce4f3]">{title}</span>
    </div>
  );
}
