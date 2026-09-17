import { Inbox, Send, Sparkles, UserPlus } from "lucide-react";
import { FollowRequestRow } from "@/components/profile/follow-request-row";
import { EmptyState } from "@/components/ui/empty-state";
import { getFollowRequests } from "@/lib/supabase/follow-request-actions";

export default async function FollowRequestsPage() {
  const [incoming, outgoing] = await Promise.all([getFollowRequests("incoming"), getFollowRequests("outgoing")]);
  return <div className="space-y-10 pb-14">
    <section className="space-y-3 pt-4 sm:pt-6"><div className="flex items-center gap-3 text-[#9b6dff]"><Sparkles className="h-5 w-5" /><span className="text-xs font-semibold uppercase tracking-[0.24em]">Social</span></div><div className="flex items-center gap-3"><UserPlus className="h-8 w-8 text-[#8b5cf6]" /><h1 className="editorial-title bg-[linear-gradient(135deg,#f3f0ff,#d4c5f9,#c4b5fd)] bg-clip-text text-5xl font-normal leading-none text-transparent sm:text-6xl">Follow Requests</h1></div><p className="text-base font-medium text-[#b8c1ec]">Manage people who want to follow your private profile.</p></section>
    <RequestSection title="Incoming requests" users={incoming} direction="incoming" icon={<Inbox className="h-5 w-5" />} emptyTitle="No incoming requests" emptyDescription="New follow requests will appear here." />
    <RequestSection title="Outgoing requests" users={outgoing} direction="outgoing" icon={<Send className="h-5 w-5" />} emptyTitle="No outgoing requests" emptyDescription="Requests you send to private profiles will appear here." />
  </div>;
}

function RequestSection({ title, users, direction, icon, emptyTitle, emptyDescription }: { title: string; users: Awaited<ReturnType<typeof getFollowRequests>>; direction: "incoming" | "outgoing"; icon: React.ReactNode; emptyTitle: string; emptyDescription: string }) {
  return <section className="mx-auto w-full max-w-4xl space-y-5"><div className="flex items-center gap-3 text-[#8b5cf6]">{icon}<h2 className="section-subtitle">{title}</h2></div>{users.length ? <div className="space-y-3">{users.map(user => <FollowRequestRow key={user.id} user={user} direction={direction} />)}</div> : <EmptyState eyebrow="Follow Requests" title={emptyTitle} description={emptyDescription} icon={icon} />}</section>;
}
