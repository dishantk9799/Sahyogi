/* eslint-disable @next/next/no-img-element */
import { initials, cn } from "@/lib/utils";

type AvatarProps = {
  name: string;
  src?: string;
  className?: string;
};

export function Avatar({ name, src, className }: AvatarProps) {
  return (
    <div
      className={cn(
        "grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-border bg-muted text-xs font-semibold text-muted-foreground",
        className,
      )}
    >
      {src ? <img src={src} alt={name} className="h-full w-full object-cover" /> : initials(name)}
    </div>
  );
}
