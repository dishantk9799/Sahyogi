import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import Badge from "../../../shared/components/Badge";
import Button from "../../../shared/components/Button";
import Card, { CardContent } from "../../../shared/components/Card";
import Icon from "../../../shared/components/Icon";
import Loader from "../../../shared/components/Loader";
import { formatDate, getApiData, getApiMessage } from "../../../shared/utils/formatters";
import { useAuth } from "../../auth/hooks/useAuth";
import { getBlogBySlug, toggleBlogLike } from "../api/blog.api";

function BlogDetail() {
    const { slug } = useParams();
    const { user } = useAuth();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBlogBySlug(slug)
            .then((response) => setBlog(getApiData(response)))
            .catch((error) => toast.error(getApiMessage(error, "Could not load blog")))
            .finally(() => setLoading(false));
    }, [slug]);

    const likeBlog = async () => {
        if (!user) {
            toast.error("Please login first");
            return;
        }

        try {
            await toggleBlogLike(blog._id);
            toast.success("Blog like updated");
        } catch (error) {
            toast.error(getApiMessage(error));
        }
    };

    if (loading) return <Loader label="Loading blog..." />;
    if (!blog) return null;

    return (
        <article className="mx-auto grid max-w-4xl gap-6">
            {blog.coverImage ? (
                <img src={blog.coverImage} alt={blog.title} className="max-h-[420px] w-full rounded-xl object-cover" />
            ) : (
                <div className="flex h-72 items-center justify-center rounded-xl bg-gradient-to-br from-orange-950/30 to-amber-950/30">
                    <Icon name="file" className="h-16 w-16 text-orange-400" />
                </div>
            )}

            <Card>
            <CardContent className="grid gap-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">{blog.title}</h1>
                        <div className="mt-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
                            {blog.authorId?.username && <Link to={`/profile/${blog.authorId.username}`} className="hover:text-foreground">@{blog.authorId.username}</Link>}
                            <span>{formatDate(blog.createdAt)}</span>
                        </div>
                    </div>
                    <Button type="button" variant="secondary" onClick={likeBlog}>Like</Button>
                </div>

                {blog.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag) => (
                            <Badge key={tag} tone="orange">{tag}</Badge>
                        ))}
                    </div>
                )}

                <div className="whitespace-pre-wrap leading-7 text-muted-foreground">{blog.content}</div>
            </CardContent>
            </Card>
        </article>
    );
}

export default BlogDetail;
