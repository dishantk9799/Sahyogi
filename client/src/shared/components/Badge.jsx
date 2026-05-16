function Badge({ children, active = false, tone = "emerald", className = "" }) {
    const activeClass = tone === "orange"
        ? "border-orange-500 bg-orange-500/15 text-orange-300"
        : "border-emerald-500 bg-emerald-500/15 text-emerald-300";

    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${
            active ? activeClass : "border-border bg-white/5 text-muted-foreground"
        } ${className}`}>
            {children}
        </span>
    );
}

export default Badge;
