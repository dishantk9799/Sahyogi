function Card({ children, className = "" }) {
    return (
        <div className={`rounded-xl border border-border/70 bg-card/80 text-card-foreground shadow-sm backdrop-blur-xl ${className}`}>
            {children}
        </div>
    );
}

export function CardHeader({ children, className = "" }) {
    return <div className={`p-5 pb-2 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }) {
    return <div className={`p-5 ${className}`}>{children}</div>;
}

export default Card;
