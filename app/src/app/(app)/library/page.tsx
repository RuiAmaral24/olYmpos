import { LibraryManager } from "@/components/library/library-manager";
import { getUserLibraryItems } from "@/lib/supabase/library";

export default async function LibraryPage() {
  const items = await getUserLibraryItems();

  return <LibraryManager initialItems={items} />;
}
