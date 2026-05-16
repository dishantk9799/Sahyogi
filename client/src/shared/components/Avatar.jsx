function Avatar({ src, name = "User", className = "" }) {
    return (
        <div className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 font-bold text-white ${className}`}>
            {src ? (
                <img src={src} alt={name} className="h-full w-full object-cover" />
            ) : (
                <span>{name?.charAt(0)?.toUpperCase() || "U"}</span>
            )}
        </div>
    );
}

export default Avatar;
