import { Globe, Lock, PenLine } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ProfileHeroCardProps = {
  username: string;
  bio: string;
  isPublic: boolean;
  interests: string[];
};

export function ProfileHeroCard({
  username,
  bio,
  isPublic,
  interests,
}: ProfileHeroCardProps) {
  return (
    <Card className="relative overflow-hidden border border-white/8 bg-[linear-gradient(135deg,rgba(20,29,47,0.96),rgba(10,14,24,0.98))]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,108,255,0.18),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(78,161,255,0.14),transparent_22%)]" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(124,108,255,0.34),rgba(78,161,255,0.2))] text-3xl font-semibold tracking-[-0.05em] text-white shadow-[0_18px_40px_rgba(78,161,255,0.16)]">
            OR
          </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-[2.1rem] font-semibold tracking-[-0.04em] text-white sm:text-[2.45rem]">
                  {username}
                  </h2>
                <Badge className="border-white/12 bg-white/8 text-[#d8dff1]">
                  {isPublic ? (
                    <Globe className="mr-2 h-3.5 w-3.5" />
                  ) : (
                    <Lock className="mr-2 h-3.5 w-3.5" />
                  )}
                  {isPublic ? "Public Profile" : "Private Profile"}
                </Badge>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-[#afbad1] sm:text-base">
                {bio}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-[#d8e0f2]"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-start lg:justify-end">
          <Button className="h-12 rounded-2xl px-6" leftIcon={<PenLine className="h-4 w-4" />}>
            Edit Profile
          </Button>
        </div>
      </div>
    </Card>
  );
}
