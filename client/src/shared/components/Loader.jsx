function Loader({ label = "Loading..." }) {
    return (
        <div className="flex min-h-48 items-center justify-center text-sm text-muted-foreground">
            {label}
        </div>
    );
}

export default Loader;
