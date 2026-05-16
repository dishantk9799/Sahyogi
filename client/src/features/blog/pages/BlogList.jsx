import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Badge from "../../../shared/components/Badge";
import Button from "../../../shared/components/Button";
import Card, { CardContent } from "../../../shared/components/Card";
import EmptyState from "../../../shared/components/EmptyState";
import Icon from "../../../shared/components/Icon";
import Loader from "../../../shared/components/Loader";
import { getApiData, getApiMessage } from "../../../shared/utils/formatters";
import { useAuth } from "../../auth/hooks/useAuth";
import { getAllBlogs, toggleBlogLike } from "../api/blog.api";
import BlogCard from "../components/BlogCard";

function BlogList() {
    const { user } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [activeTag, setActiveTag] = useState("");

    useEffect(() => {
        getAllBlogs()
            .then((response) => setBlogs(getApiData(response) || []))
            .catch((error) => toast.error(getApiMessage(error, "Could not load blogs")))
            .finally(() => setLoading(false));
    }, []);

    const likeBlog = async (id) => {
        if (!user) {
            toast.error("Please login first");
            return;
        }

        try {
            await toggleBlogLike(id);
            toast.success("Blog like updated");
        } catch (error) {
            toast.error(getApiMessage(error));
        }
    };

    const tags = ["React", "JavaScript", "MERN", "CSS", "DevOps", "MongoDB", "Node"];
    const filteredBlogs = blogs.filter((blog) => {
        const blogTags = Array.isArray(blog.tags) ? blog.tags : [];
        const haystack = `${blog.title || ""} ${blog.content || ""} ${blogTags.join(" ")}`.toLowerCase();
        const matchesSearch = !search || haystack.includes(search.toLowerCase());
        const matchesTag = !activeTag || blogTags.some((tag) => tag.toLowerCase().includes(activeTag.toLowerCase()));
        return matchesSearch && matchesTag;
    });

    if (loading) return <Loader label="Loading blogs..." />;

    return (
        <section className="mx-auto grid max-w-6xl gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Explore <span className="gradient-text">Blogs</span></h1>
                    <p className="mt-2 text-sm text-muted-foreground">Discover technical articles, tutorials, and insights.</p>
                </div>
                {user && (
                    <Link to="/blogs/new" className="inline-flex h-10 items-center gap-2 rounded-md bg-emerald-600 px-4 text-sm font-medium text-white hover:bg-emerald-700">
                        <Icon name="plus" />
                        New blog
                    </Link>
                )}
            </div>

            <div className="grid gap-4">
                <div className="relative">
                    <Icon name="search" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search blogs by title, content, or tag..."
                        className="h-11 w-full rounded-md border border-border bg-white/5 pl-10 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                </div>
                <Card className="bg-background/60">
                    <CardContent className="flex flex-wrap items-center gap-2 p-4">
                        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Icon name="filter" className="h-3.5 w-3.5" />Tags:
                        </span>
                        {tags.map((tag) => (
                            <button key={tag} type="button" onClick={() => setActiveTag((current) => current === tag ? "" : tag)}>
                                <Badge active={activeTag === tag} tone="orange">{tag}</Badge>
                            </button>
                        ))}
                        {(search || activeTag) && (
                            <button type="button" onClick={() => { setSearch(""); setActiveTag(""); }}>
                                <Badge className="border-red-500/40 text-red-300"><Icon name="close" className="mr-1 h-3 w-3" />Clear</Badge>
                            </button>
                        )}
                    </CardContent>
                </Card>
                <p className="text-sm text-muted-foreground">{filteredBlogs.length} result{filteredBlogs.length === 1 ? "" : "s"} found</p>
            </div>

            {filteredBlogs.length === 0 ? (
                <EmptyState title="No blogs yet" description="Publish the first blog from your dashboard." />
            ) : (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {filteredBlogs.map((blog) => (
                        <BlogCard
                            key={blog._id}
                            blog={blog}
                            actions={<Button type="button" variant="secondary" onClick={() => likeBlog(blog._id)}>Like</Button>}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default BlogList;
