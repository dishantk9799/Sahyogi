import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import Icon from "../components/Icon";

function AppLayout() {
    const { user, logout } = useAuth();

    const navClass = ({ isActive }) => {
        return `inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
            isActive ? "bg-emerald-600 text-white" : "text-muted-foreground hover:bg-white/10 hover:text-foreground"
        }`;
    };

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
                    <Link to="/" className="flex items-center gap-2 transition hover:opacity-80">
                        <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-emerald-600">
                            <img src="/devhub-logo.png" alt="DevHub" className="h-full w-full object-cover" />
                        </span>
                        <span className="text-xl font-bold">
                            Sah<span className="text-emerald-400">yogi</span>
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-1 md:flex">
                        <NavLink to="/" end className={navClass}><Icon name="home" />Home</NavLink>
                        <NavLink to="/projects" className={navClass}><Icon name="folder" />Projects</NavLink>
                        <NavLink to="/blogs" className={navClass}><Icon name="file" />Blogs</NavLink>
                        {user && <NavLink to="/dashboard" className={navClass}><Icon name="dashboard" />Dashboard</NavLink>}
                    </nav>

                    <div className="flex items-center gap-2">
                        {user ? (
                            <>
                                <div className="hidden items-center gap-1 sm:flex">
                                    <Link to="/projects/new" className="inline-flex h-9 items-center gap-1 rounded-md bg-emerald-600 px-3 text-sm font-medium text-white hover:bg-emerald-700">
                                        <Icon name="plus" className="h-3.5 w-3.5" />Project
                                    </Link>
                                    <Link to="/blogs/new" className="inline-flex h-9 items-center gap-1 rounded-md bg-emerald-600 px-3 text-sm font-medium text-white hover:bg-emerald-700">
                                        <Icon name="plus" className="h-3.5 w-3.5" />Blog
                                    </Link>
                                </div>
                                <Link
                                    to={`/profile/${user.username}`}
                                    className="hidden items-center gap-2 rounded-full p-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-white/10 hover:text-foreground sm:flex"
                                >
                                    <Avatar src={user.profileImage} name={user.name} className="h-8 w-8 text-sm" />
                                    <span>{user.name}</span>
                                </Link>
                                <Button type="button" variant="ghost" onClick={logout} className="px-3">
                                    <Icon name="logout" />
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
                <Outlet />
            </main>

            <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
                    <div className="flex items-center gap-2 text-foreground">
                        <span className="flex h-6 w-6 overflow-hidden rounded-md bg-emerald-600">
                            <img src="/devhub-logo.png" alt="DevHub" className="h-full w-full object-cover" />
                        </span>
                        <span className="font-semibold">Sah<span className="text-emerald-400">yogi</span></span>
                    </div>
                    <p>© {new Date().getFullYear()} Sahyogi. Built For Developer.</p>
                    <div className="flex gap-4">
                        <span>Privacy</span>
                        <span>Terms</span>
                        <span>Contact</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default AppLayout;
