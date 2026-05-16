function Textarea({ label, className = "", ...props }) {
    return (
        <label className="grid gap-2 text-sm font-medium text-foreground">
            {label}
            <textarea
                className={`min-h-32 rounded-md border border-border bg-white/5 px-3 py-2 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 ${className}`}
                {...props}
            />
        </label>
    );
}

export default Textarea;
