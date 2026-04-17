import { LibraryManager } from "@/components/library/library-manager";
import { mockLibraryItems } from "@/data/mock-library";

export default function LibraryPage() {
  return <LibraryManager initialItems={mockLibraryItems} />;
}
