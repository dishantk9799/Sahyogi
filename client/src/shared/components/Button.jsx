function Button({ children, className = "", variant = "primary", ...props }) {
    const variants = {
        primary: "bg-emerald-600 text-white hover:bg-emerald-700 emerald-glow",
        secondary: "border border-border bg-white/5 text-foreground hover:bg-white/10",
        ghost: "text-muted-foreground hover:bg-white/10 hover:text-foreground",
        danger: "bg-red-600 text-white hover:bg-red-700"
    };

    return (
        <button
            className={`inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
