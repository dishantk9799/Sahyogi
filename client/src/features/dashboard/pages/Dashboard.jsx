import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Avatar from "../../../shared/components/Avatar";
import Card, { CardContent, CardHeader } from "../../../shared/components/Card";
import Icon from "../../../shared/components/Icon";
import Loader from "../../../shared/components/Loader";
import { getApiData, getApiMessage } from "../../../shared/utils/formatters";
import { useAuth } from "../../auth/hooks/useAuth";
import { getMyBlogs } from "../../blog/api/blog.api";
import BlogCard from "../../blog/components/BlogCard";
import { getMyProjects } from "../../project/api/project.api";
import ProjectCard from "../../project/components/ProjectCard";
import { getDashboard } from "../api/dashboard.api";

function Dashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [projects, setProjects] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getDashboard(), getMyProjects(), getMyBlogs()])
            .then(([statsResponse, projectsResponse, blogsResponse]) => {
                setStats(getApiData(statsResponse));
                setProjects(getApiData(projectsResponse) || []);
                setBlogs(getApiData(blogsResponse) || []);
            })
            .catch((error) => toast.error(getApiMessage(error, "Could not load dashboard")))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loader label="Loading dashboard..." />;

    const statItems = [
        ["Projects", stats?.projects ?? 0, "folder", "text-emerald-400 bg-emerald-500/10"],
        ["Blogs", stats?.blogs ?? 0, "file", "text-orange-400 bg-orange-500/10"],
        ["Followers", stats?.followers ?? 0, "users", "text-purple-400 bg-purple-500/10"],
        ["Following", stats?.following ?? 0, "heart", "text-rose-400 bg-rose-500/10"]
    ];

    return (
        <section className="mx-auto grid max-w-5xl gap-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Avatar src={user?.profileImage} name={user?.name} className="h-16 w-16 text-xl" />
                    <div>
                        <h1 className="text-3xl font-bold">Welcome back, {user?.name?.split(" ")[0] || "Developer"}!</h1>
                        <p className="mt-1 text-sm text-muted-foreground">@{user?.username}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link to="/projects/new" className="inline-flex h-10 items-center gap-2 rounded-md bg-emerald-600 px-4 text-sm font-medium text-white hover:bg-emerald-700"><Icon name="plus" />Project</Link>
                    <Link to="/blogs/new" className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-white/5 px-4 text-sm font-medium hover:bg-white/10"><Icon name="plus" />Blog</Link>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {statItems.map(([label, value, icon, tone]) => (
                    <Card key={label} className="transition hover:border-emerald-500/30">
                        <CardContent>
                            <div className={`mb-3 inline-flex rounded-lg p-2 ${tone}`}>
                                <Icon name={icon} className="h-5 w-5" />
                            </div>
                            <p className="text-3xl font-bold">{value}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <h2 className="text-lg font-semibold">Quick Actions</h2>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                    <Link to="/projects/new" className="inline-flex h-10 items-center gap-2 rounded-md bg-emerald-600 px-4 text-sm font-medium text-white hover:bg-emerald-700"><Icon name="plus" />Create Project</Link>
                    <Link to="/blogs/new" className="inline-flex h-10 items-center gap-2 rounded-md bg-emerald-600 px-4 text-sm font-medium text-white hover:bg-emerald-700"><Icon name="plus" />Create Blog</Link>
                    <Link to="/profile/edit" className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-white/5 px-4 text-sm font-medium hover:bg-white/10"><Icon name="edit" />Edit Profile</Link>
                    <Link to="/saved-projects" className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-white/5 px-4 text-sm font-medium hover:bg-white/10"><Icon name="bookmark" />Saved Projects</Link>
                </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <h2 className="flex items-center gap-2 text-lg font-semibold"><Icon name="folder" className="h-5 w-5 text-emerald-400" />Recent Projects</h2>
                        {projects.length > 0 && <Link to="/projects" className="text-xs text-muted-foreground hover:text-foreground">View All</Link>}
                    </CardHeader>
                    <CardContent className="grid gap-3">
                        {projects.length === 0 ? (
                            <div className="py-8 text-center text-sm text-muted-foreground">No projects yet</div>
                        ) : (
                            projects.map((project) => <ProjectCard key={project._id} project={project} compact />)
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <h2 className="flex items-center gap-2 text-lg font-semibold"><Icon name="file" className="h-5 w-5 text-orange-400" />Recent Blogs</h2>
                        {blogs.length > 0 && <Link to="/blogs" className="text-xs text-muted-foreground hover:text-foreground">View All</Link>}
                    </CardHeader>
                    <CardContent className="grid gap-3">
                        {blogs.length === 0 ? (
                            <div className="py-8 text-center text-sm text-muted-foreground">No blogs yet</div>
                        ) : (
                            blogs.map((blog) => <BlogCard key={blog._id} blog={blog} compact />)
                        )}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

export default Dashboard;
