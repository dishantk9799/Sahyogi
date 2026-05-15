import { cn } from "@/lib/utils";

export function CoverFrame({
  title,
  className,
  tone = "teal",
}: {
  title: string;
  className?: string;
  tone?: "teal" | "violet" | "amber";
}) {
  const toneClass = {
    teal: "from-teal-900 via-stone-600 to-amber-200",
    violet: "from-violet-950 via-slate-700 to-teal-200",
    amber: "from-amber-900 via-stone-700 to-sky-200",
  }[tone];

  return (
    <div className={cn("relative overflow-hidden rounded-lg border bg-muted", className)}>
      <div className={cn("absolute inset-0 bg-gradient-to-br", toneClass)} />
      <div className="absolute inset-x-6 bottom-6 border-t border-white/45 pt-4 text-white">
        <p className="max-w-md font-serif text-3xl leading-tight">{title}</p>
      </div>
      <div className="absolute right-6 top-6 h-16 w-16 rounded-full border border-white/40" />
      <div className="absolute right-16 top-16 h-24 w-24 rounded-full border border-white/20" />
    </div>
  );
}
