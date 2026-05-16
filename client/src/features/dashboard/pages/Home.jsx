import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Badge from "../../../shared/components/Badge";
import Button from "../../../shared/components/Button";
import Card, { CardContent } from "../../../shared/components/Card";
import Icon from "../../../shared/components/Icon";
import Skeleton from "../../../shared/components/Skeleton";
import { getApiData, getApiMessage } from "../../../shared/utils/formatters";
import { useAuth } from "../../auth/hooks/useAuth";
import { getAllBlogs } from "../../blog/api/blog.api";
import BlogCard from "../../blog/components/BlogCard";
import { getAllProjects } from "../../project/api/project.api";
import ProjectCard from "../../project/components/ProjectCard";

function Home() {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getAllProjects(), getAllBlogs()])
            .then(([projectsResponse, blogsResponse]) => {
                setProjects((getApiData(projectsResponse) || []).slice(0, 6));
                setBlogs((getApiData(blogsResponse) || []).slice(0, 3));
            })
            .catch((error) => toast.error(getApiMessage(error, "Could not load home feed")))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="mx-auto max-w-6xl space-y-12">
            <section className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-background via-background to-emerald-950/30 p-8 md:p-12 lg:p-16">
                <div
                    className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
                    style={{ backgroundImage: "url(/hero-bg.png)" }}
                />
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl" />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    <Badge active className="mb-6">
                        Open Source Developer Community
                    </Badge>
                    <h1 className="mb-4 text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
                        <span className="gradient-text">Sahyogi</span>
                    </h1>
                    <p className="mb-2 max-w-2xl text-xl text-muted-foreground md:text-2xl">
                        Where Developers Connect, Build & Share
                    </p>
                    <p className="mb-8 max-w-lg text-sm text-muted-foreground/80 md:text-base">
                        Showcase your projects, write technical blogs, and grow your network with developers worldwide.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {user ? (
                            <>
                                <Link to="/projects" className="inline-flex h-11 items-center gap-2 rounded-md bg-emerald-600 px-5 text-sm font-medium text-white hover:bg-emerald-700">
                                    <Icon name="rocket" />Explore Projects
                                </Link>
                                <Link to="/projects/new" className="inline-flex h-11 items-center gap-2 rounded-md border border-emerald-500/30 px-5 text-sm font-medium hover:bg-emerald-500/10">
                                    <Icon name="code" />Share Your Work
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="inline-flex h-11 items-center gap-2 rounded-md bg-emerald-600 px-5 text-sm font-medium text-white hover:bg-emerald-700">
                                    <Icon name="rocket" />Get Started Free
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm">
                        <span className="flex items-center gap-2"><Icon name="users" className="h-5 w-5 text-emerald-400" /><b>10K+</b><span className="text-muted-foreground">Developers</span></span>
                        <span className="flex items-center gap-2"><Icon name="code" className="h-5 w-5 text-emerald-400" /><b>{projects.length}+</b><span className="text-muted-foreground">Projects</span></span>
                        <span className="flex items-center gap-2"><Icon name="book" className="h-5 w-5 text-emerald-400" /><b>{blogs.length}+</b><span className="text-muted-foreground">Blog Posts</span></span>
                    </div>
                </div>
            </section>

            <FeedSection
                title="Latest Projects"
                icon="rocket"
                to="/projects"
                loading={loading}
                skeletonCount={6}
                empty="No projects yet"
            >
                {projects.map((project) => <ProjectCard key={project._id} project={project} />)}
            </FeedSection>

            <FeedSection
                title="Featured Blogs"
                icon="book"
                to="/blogs"
                loading={loading}
                skeletonCount={3}
                empty="No blogs yet"
            >
                {blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
            </FeedSection>

            {!user && (
                <Card className="relative overflow-hidden border-emerald-500/20 bg-gradient-to-br from-emerald-950/40 via-background to-emerald-950/20">
                    <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-2xl" />
                    <CardContent className="relative z-10 flex flex-col items-center gap-4 py-10 text-center">
                        <Icon name="github" className="h-10 w-10 text-emerald-400" />
                        <h2 className="text-2xl font-bold md:text-3xl">Ready to Join the Community?</h2>
                        <p className="max-w-md text-muted-foreground">
                            Create your developer profile, share your projects, and connect with other developers.
                        </p>
                        <Link to="/register" className="inline-flex h-11 items-center rounded-md bg-emerald-600 px-5 text-sm font-medium text-white hover:bg-emerald-700">
                            Create Your Profile
                        </Link>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

function FeedSection({ title, icon, to, loading, skeletonCount, empty, children }) {
    const hasItems = Array.isArray(children) ? children.length > 0 : Boolean(children);

    return (
        <section>
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Icon name={icon} className="h-5 w-5 text-emerald-400" />
                    <h2 className="text-2xl font-bold">{title}</h2>
                </div>
                <Link to={to} className="inline-flex items-center gap-1 text-sm font-medium text-emerald-400 hover:text-emerald-300">
                    View All <Icon name="arrowRight" />
                </Link>
            </div>
            {loading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: skeletonCount }).map((_, index) => (
                        <Card key={index}>
                            <CardContent className="space-y-3">
                                <Skeleton className="h-40 w-full rounded-lg" />
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : hasItems ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
            ) : (
                <Card><CardContent className="py-10 text-center text-muted-foreground">{empty}</CardContent></Card>
            )}
        </section>
    );
}

export default Home;
