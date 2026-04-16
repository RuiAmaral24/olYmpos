import { Bell, Search, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AppHeader() {
  return (
    <header className="premium-panel sticky top-4 z-20 rounded-[28px] px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent-secondary">
              Dashboard
            </p>
            <h1 className="text-xl font-semibold tracking-[0.24em] text-foreground">
              olYmpos
            </h1>
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <HeaderIcon aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </HeaderIcon>
            <HeaderIcon aria-label="Settings">
              <Settings className="h-4 w-4" />
            </HeaderIcon>
          </div>
        </div>

        <div className="flex flex-1 items-center gap-3 lg:max-w-3xl lg:justify-end">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label="Search"
              placeholder="Search your library"
              className="pl-10"
            />
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <HeaderIcon aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </HeaderIcon>
            <HeaderIcon aria-label="Settings">
              <Settings className="h-4 w-4" />
            </HeaderIcon>
          </div>

          <div className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/8 text-sm font-semibold text-foreground sm:flex">
            OR
          </div>

          <Button variant="secondary" className="h-10 px-4">
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}

type HeaderIconProps = {
  "aria-label": string;
  children: React.ReactNode;
};

function HeaderIcon({ children, ...props }: HeaderIconProps) {
  return (
    <button
      type="button"
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-muted-foreground transition hover:text-foreground"
      {...props}
    >
      {children}
    </button>
  );
}
