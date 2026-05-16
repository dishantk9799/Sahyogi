function EmptyState({ title, description }) {
    return (
        <div className="rounded-xl border border-dashed border-border bg-white/5 p-10 text-center backdrop-blur-xl">
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
        </div>
    );
}

export default EmptyState;
